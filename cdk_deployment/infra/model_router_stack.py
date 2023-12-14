from aws_cdk import (
    CfnOutput,
    Duration,
    RemovalPolicy,
    Stack,
    aws_applicationautoscaling,
)
from aws_cdk import aws_ec2 as ec2
from aws_cdk import aws_ecs as ecs
from aws_cdk import aws_ecs_patterns as ecs_patterns
from aws_cdk import aws_elasticloadbalancingv2 as elbv2
from aws_cdk import aws_iam as iam
from aws_cdk import aws_rds as rds
from aws_cdk.aws_apigateway import (
    ConnectionType,
    CorsOptions,
    Integration,
    IntegrationOptions,
    IntegrationType,
    RestApi,
    VpcLink,
)
from constructs import Construct

from .config import (
    DB_USER,
    ECR_DOMAIN,
    alpha_cpu,
    alpha_desired_count,
    alpha_max_capacity,
    alpha_memory,
    alpha_min_capacity,
    alpha_rds_db_instance_class,
    alpha_rds_db_instance_count,
    alpha_security_group_id,
    alpha_vpc_id,
    staging_vpc_id,
    staging_desired_count,
    staging_cpu,
    staging_memory,
    staging_min_capacity,
    staging_max_capacity,
    staging_security_group_id,
    staging_rds_db_instance_class,
    staging_rds_db_instance_count,
    prod_vpc_id,
    prod_desired_count,
    prod_cpu,
    prod_memory,
    prod_min_capacity,
    prod_max_capacity,
    prod_security_group_id,
    prod_rds_db_instance_class,
    prod_rds_db_instance_count,
    rds_vpc_id,
    stage,
)


class ModelRouterStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        if stage in ["alpha"]:
            vpc_id = alpha_vpc_id
            cpu = alpha_cpu
            memory = alpha_memory
            min_capacity = alpha_min_capacity
            max_capacity = alpha_max_capacity
            security_group = alpha_security_group_id
            rds_db_instance_class = alpha_rds_db_instance_class
            rds_db_instance_count = alpha_rds_db_instance_count
            desired_count = alpha_desired_count

        elif stage in ["staging"]:
            vpc_id = staging_vpc_id
            cpu = staging_cpu
            memory = staging_memory
            min_capacity = staging_min_capacity
            max_capacity = staging_max_capacity
            security_group = staging_security_group_id
            rds_db_instance_class = staging_rds_db_instance_class
            rds_db_instance_count = staging_rds_db_instance_count
            desired_count = staging_desired_count

        elif stage in ["prod"]:
            vpc_id = prod_vpc_id
            cpu = prod_cpu
            memory = prod_memory
            min_capacity = prod_min_capacity
            max_capacity = prod_max_capacity
            security_group = prod_security_group_id
            rds_db_instance_class = prod_rds_db_instance_class
            rds_db_instance_count = prod_rds_db_instance_count
            desired_count = prod_desired_count

        # fetches vpc using the id
        vpc = ec2.Vpc.from_lookup(self, "VPC", vpc_id=vpc_id)
        rds_vpc = ec2.Vpc.from_lookup(self, "RDS-VPC", vpc_id=rds_vpc_id)

        subnet_a = self.get_one_private_subnet_from_az(vpc, "us-east-1a")
        subnet_b = self.get_one_private_subnet_from_az(vpc, "us-east-1b")
        subnet_c = self.get_one_private_subnet_from_az(vpc, "us-east-1c")
        subnets = [subnet_a, subnet_b, subnet_c]

        subnet_a_public = self.get_one_public_subnet_from_az(vpc, "us-east-1a")
        subnet_b_public = self.get_one_public_subnet_from_az(vpc, "us-east-1b")
        subnet_c_public = self.get_one_public_subnet_from_az(vpc, "us-east-1c")
        subnets_public = [subnet_a_public, subnet_b_public, subnet_c_public]


        security_group = ec2.SecurityGroup.from_security_group_id(
            self,
            f"{stage.capitalize()}ModelRouterSecurityGroup",
            security_group_id=security_group,
        )

        ecr_image = f"{ECR_DOMAIN}/{stage}-model-router:latest"

        alb_public = elbv2.ApplicationLoadBalancer(
            self,
            f"{stage}_model_router_public_alb",
            vpc=vpc,
            internet_facing=True,
            load_balancer_name=f"{stage}-model-router-alb",
            vpc_subnets=ec2.SubnetSelection(subnets=subnets_public),
        )

        fargate_service_alb = ecs_patterns.ApplicationLoadBalancedFargateService(
            self,
            stage + "_model_router_alb",
            vpc=vpc,
            cpu=cpu,
            desired_count=desired_count,
            task_image_options=ecs_patterns.ApplicationLoadBalancedTaskImageOptions(
                image=ecs.ContainerImage.from_registry(ecr_image),
                container_port=8000
            ),
            memory_limit_mib=memory,
            assign_public_ip=False,
            load_balancer=alb_public,
            public_load_balancer=True,
            task_subnets=ec2.SubnetSelection(subnets=subnets),
            listener_port=8000
        )

        # Get the security group associated with the Fargate service
        fargate_sg_alb = fargate_service_alb.service.connections.security_groups[0]
        fargate_sg_alb.add_ingress_rule(
            peer=ec2.Peer.ipv4(vpc.vpc_cidr_block),
            connection=ec2.Port.tcp(8000),
            description="Allow incoming traffic to Model Router",
        )
        fargate_service_alb.service.connections.allow_internally(ec2.Port.all_traffic())

        # Fetch the task definition
        alb_task_definition_role = fargate_service_alb.service.task_definition.task_role

        # Fetch the task execution role
        alb_task_execution_role = fargate_service_alb.service.task_definition.execution_role
        alb_task_roles = [alb_task_definition_role, alb_task_execution_role]

        # Add the managed policies to the task definition and task execution roles
        for role in alb_task_roles:
            role.add_managed_policy(
                iam.ManagedPolicy.from_aws_managed_policy_name(
                    "AmazonEC2ContainerRegistryReadOnly"
                )
            )

            role.add_managed_policy(
                iam.ManagedPolicy.from_managed_policy_arn(
                    self,
                    f"{role}Policy",
                    managed_policy_arn="arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
                )
            )

            role.add_managed_policy(
                iam.ManagedPolicy.from_aws_managed_policy_name("AmazonSQSFullAccess")
            )


        """
        Setup AutoScaling policy

        The scaling_steps list defines the scaling intervals and their corresponding configurations for the autoscaling policy.

        Scaling Interval with change=-1, upper=10, and cooldown=core.Duration.seconds(300):
        It specifies that if the metric value is between 0 and 10 (inclusive), the desired capacity of the autoscaling group will be decreased by 1.
        The cooldown period for this scaling step is set to 300 seconds (5 minutes), which means that after the scaling action is taken,
        the autoscaling group will not take any further scaling actions for the next 5 minutes.

        Scaling Interval with change=2, lower=50, and cooldown=core.Duration.seconds(60):
        It specifies that if the metric value is between 50 and 70 (inclusive), the desired capacity of the autoscaling group will be increased by 1.
        The cooldown period for this scaling step is set to 60 seconds (1 minute), which means that after the scaling action is taken,
        the autoscaling group will not take any further scaling actions for the next 1 minute.

        Scaling Interval with change=3, lower=70, and cooldown=core.Duration.seconds(60):
        It specifies that if the metric value is greater than or equal to 70, the desired capacity of the autoscaling group will be increased by 2.
        The cooldown period for this scaling step is set to 60 seconds (1 minute), which means that after the scaling action is taken,
        the autoscaling group will not take any further scaling actions for the next 1 minute.

        The task count won't go lesser than min_capacity or more than max_capacity irrespective of any autoscaling policy definition
        """

        alb_scaling = fargate_service_alb.service.auto_scale_task_count(
            min_capacity=min_capacity, max_capacity=max_capacity
        )

        alb_scaling_steps = [
            {"upper": 11, "change": -1, "cooldown": Duration.seconds(301)},
            {"lower": 51, "change": 1, "cooldown": Duration.seconds(60)},
            {"lower": 71, "change": 2, "cooldown": Duration.seconds(60)},
        ]

        # Autoscaling policy for target cpu utilization
        alb_cpu_utilization = fargate_service_alb.service.metric_cpu_utilization()
        alb_scaling.scale_on_metric(
            "autoscale_cpu_usage_",
            metric=alb_cpu_utilization,
            scaling_steps=alb_scaling_steps,
            adjustment_type=aws_applicationautoscaling.AdjustmentType.CHANGE_IN_CAPACITY,
        )

        # Autoscaling policy for target memory utilization
        alb_memory_utilization = fargate_service_alb.service.metric_memory_utilization()
        alb_scaling.scale_on_metric(
            "autoscale_memory_usage_",
            metric=alb_memory_utilization,
            scaling_steps=alb_scaling_steps,
            adjustment_type=aws_applicationautoscaling.AdjustmentType.CHANGE_IN_CAPACITY,
        )

        rds_subnets = list()
        azs = ["us-east-1a", "us-east-1b", "us-east-1c"]
        for az in azs:
            # rds_subnets.append(self.get_one_private_subnet_from_az(rds_vpc, az))
            rds_subnets.append(self.get_one_public_subnet_from_az(rds_vpc, az))

        db_name = "preview-model-router" if stage == "alpha" else f"{stage}-model-router"
        aurora_cluster = rds.DatabaseCluster(
            self,
            db_name,
            engine=rds.DatabaseClusterEngine.aurora_postgres(
                version=rds.AuroraPostgresEngineVersion.VER_13_7
            ),
            credentials=rds.Credentials.from_generated_secret(username=DB_USER),
            default_database_name="model_router",
            instance_props=rds.InstanceProps(
                publicly_accessible=True,
                vpc=rds_vpc,
                vpc_subnets=ec2.SubnetSelection(subnets=rds_subnets),
                instance_type=ec2.InstanceType(
                    instance_type_identifier=rds_db_instance_class
                ),
            ),
            removal_policy=RemovalPolicy.DESTROY,
            instances=rds_db_instance_count,
            deletion_protection=False,
            storage_encrypted=True
        )

        # allow traffic from the fargate service to the RDS cluster
        aurora_cluster.connections.allow_from(
            fargate_service_alb.service,
            ec2.Port.tcp(aurora_cluster.cluster_endpoint.port),
            description="Allow incoming traffic from Fargate service to RDS cluster",
        )

    def get_one_private_subnet_from_az(self, vpc: ec2.Vpc, az: str) -> ec2.ISubnet:
        """
        Get subnet for the given availability zone from the VPC object.
        Args:
            vpc (ec2.Vpc): VPC object.
            az (str): Availability zone.
        Returns:
            ec2.ISubnet: Subnet for the given availability zone.
        """

        private_subnets = vpc.select_subnets(
            subnet_type=ec2.SubnetType.PRIVATE_WITH_EGRESS, availability_zones=[az]
        ).subnets
        return private_subnets[0]

    def get_one_public_subnet_from_az(self, vpc: ec2.Vpc, az: str) -> ec2.ISubnet:
        """
        Get subnet for the given availability zone from the VPC object.
        Args:
            vpc (ec2.Vpc): VPC object.
            az (str): Availability zone.
        Returns:
            ec2.ISubnet: Subnet for the given availability zone.
        """
        public_subnets = vpc.select_subnets(
            subnet_type=ec2.SubnetType.PUBLIC, availability_zones=[az]
        ).subnets
        return public_subnets[0]
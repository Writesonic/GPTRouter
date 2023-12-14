import aws_cdk as core
import aws_cdk.assertions as assertions

from cdk_deployment.cdk_deployment_stack import CdkDeploymentStack

# example tests. To run these tests, uncomment this file along with the example
# resource in cdk_deployment/cdk_deployment_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = CdkDeploymentStack(app, "cdk-deployment")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })

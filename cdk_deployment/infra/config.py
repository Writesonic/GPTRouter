stage = ""
DB_USER = ""
AWS_REGION = ""
AWS_ACCOUNT = ""
ECR_DOMAIN = ""

staging_vpc_id = ""
staging_desired_count = 1
staging_cpu = 4096
staging_memory = 8192
staging_min_capacity = 1
staging_max_capacity = 4
staging_security_group_id = ""
staging_rds_db_instance_class = "t4g.large"
staging_rds_db_instance_count = 1

prod_vpc_id = ""
prod_desired_count = 1
prod_cpu = 4096
prod_memory = 8192
prod_min_capacity = 1
prod_max_capacity = 4
prod_security_group_id = ""
prod_rds_db_instance_class = "t4g.large"
prod_rds_db_instance_count = 1

alpha_vpc_id = ""
alpha_desired_count = 1
alpha_cpu = 4096
alpha_memory = 8192
alpha_min_capacity = 1
alpha_max_capacity = 2
alpha_security_group_id = ""
alpha_rds_db_instance_class = "t4g.large"
alpha_rds_db_instance_count = 1

rds_vpc_id = ""

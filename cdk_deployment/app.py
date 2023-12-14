#!/usr/bin/env python3
import os

import aws_cdk as cdk

from infra.model_router_stack import ModelRouterStack
from infra.config import stage, AWS_REGION, AWS_ACCOUNT

app = cdk.App()
ModelRouterStack(
    app,
    f"{stage.upper()}ModelRouter",
    env=cdk.Environment(account=AWS_ACCOUNT, region=AWS_REGION),
    )

app.synth()

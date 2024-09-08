import * as cdk from "aws-cdk-lib";
import { CdkStack } from "../lib/cdk-stack";

const app = new cdk.App();

// CDK Stack
new CdkStack(app, "CdkStack", {});

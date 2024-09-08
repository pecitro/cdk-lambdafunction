import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const api = new cdk.aws_apigateway.RestApi(this, 'api', {
    //   restApiName: 'api',
    // });

    // const bucket_aaa = new s3.Bucket(this, 'testbucket', {
    //   removalPolicy: cdk.RemovalPolicy.DESTROY,
    // });

    // Lambda関数
    const projectRoot = "../backend";

    const lambda = new cdk.aws_lambda_nodejs.NodejsFunction(this, "lambda", {
      entry: "../backend/index.ts",
      handler: "handler",
      runtime: cdk.aws_lambda.Runtime.NODEJS_20_X,
      memorySize: 256,
      bundling: {
        forceDockerBundling: true,
      },
    });
  }
}

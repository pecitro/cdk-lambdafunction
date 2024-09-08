import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambda_nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as s3 from "aws-cdk-lib/aws-s3";
import type { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Site S3 Bucket作成
    const siteBucket = new s3.Bucket(this, "staticSitesBucket", {
      bucketName: `hoge-${this.account}-${this.region}`,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // Site S3 ファイルアップロード（静的アセット）
    new cdk.aws_s3_deployment.BucketDeployment(
      this,
      "staticSitesBucketUpload",
      {
        sources: [cdk.aws_s3_deployment.Source.asset("../frontend/dist")],
        destinationBucket: siteBucket,
      },
    );

    // API Lambda(VPC)
    const apiLambda = new lambda_nodejs.NodejsFunction(
      this,
      "apiServerLambda",
      {
        entry: "../backend/src/index.ts",
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_20_X,
        memorySize: 256,
        bundling: {
          forceDockerBundling: true,
        },
      },
    );

    // API Lambda関数URL
    const apiLambdaFnUrl = apiLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    });

    // CloudFront ディストリビューション作成
    const hogeDistribution = new cdk.aws_cloudfront.Distribution(
      this,
      "cloudFrontDistribution",
      {
        comment: "hoge-distribution",
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin:
            cdk.aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
              siteBucket,
            ),
          cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
        },
        additionalBehaviors: {
          "/api/*": {
            origin: new cdk.aws_cloudfront_origins.FunctionUrlOrigin(
              apiLambdaFnUrl,
            ),
            cachePolicy: cdk.aws_cloudfront.CachePolicy.CACHING_DISABLED,
          },
        },
      },
    );

    // Lambda関数URL OAC作成（CDKがL2 Constructに対応したら差し替える）
    const cfnLambdaOac = new cdk.aws_cloudfront.CfnOriginAccessControl(
      this,
      "oacLambdaUrl",
      {
        originAccessControlConfig: {
          name: "OacForLambdaUrl",
          originAccessControlOriginType: "lambda",
          signingBehavior: "always",
          signingProtocol: "sigv4",
        },
      },
    );

    // CloudFront OAC追加(Lambda関数URL)
    const cfnDistribution = hogeDistribution.node
      .defaultChild as cdk.aws_cloudfront.CfnDistribution;
    cfnDistribution.addPropertyOverride(
      "DistributionConfig.Origins.1.OriginAccessControlId",
      cfnLambdaOac.attrId,
    );

    // API Lambda リソースポリシーにCloudFrontを追加
    apiLambda.addPermission("AllowCloudFrontServicePrincipal", {
      principal: new cdk.aws_iam.ServicePrincipal("cloudfront.amazonaws.com"),
      action: "lambda:InvokeFunctionUrl",
      sourceArn: `arn:aws:cloudfront::${cdk.Stack.of(this).account}:distribution/${hogeDistribution.distributionId}`,
    });
  }
}

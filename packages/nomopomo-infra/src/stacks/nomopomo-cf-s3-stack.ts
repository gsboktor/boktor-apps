// apps/infrastructure/src/stacks/website-stack.ts

import * as cdk from 'aws-cdk-lib';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

import path from 'path';

import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config';
import { BasicAuthSecret } from '../constructs';

interface NomopomoCfS3StackProps extends cdk.StackProps {
  environmentConfig: EnvironmentConfig;
}

export class NomopomoCfS3Stack extends cdk.Stack {
  private readonly provisionLambdaAuthorizer = (
    envConfig: EnvironmentConfig,
  ): cdk.aws_cloudfront.experimental.EdgeFunction | undefined => {
    if (envConfig.environment != 'prod') {
      const authSecret = new BasicAuthSecret(this, `nomopomo-basic-auth-construct-${envConfig.environment}`, {
        env: envConfig.environment,
        username: envConfig.basicAuthUsername,
        password: envConfig.basicAuthPassword,
      });

      const authLambdaRole = new iam.Role(this, `nomopomo-auth-lambda-role-${envConfig.environment}`, {
        assumedBy: new iam.CompositePrincipal(
          new iam.ServicePrincipal('lambda.amazonaws.com'),
          new iam.ServicePrincipal('edgelambda.amazonaws.com'),
        ),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
          iam.ManagedPolicy.fromAwsManagedPolicyName('SecretsManagerReadWrite'),
        ],
      });

      authSecret.basicAuthSecret.grantRead(authLambdaRole);
      authSecret.encryptKey.grantDecrypt(authLambdaRole);

      const authLambdaAtEdge = new cloudfront.experimental.EdgeFunction(
        this,
        `nomopomo-authorizer-function-${envConfig.environment}`,
        {
          runtime: lambda.Runtime.NODEJS_18_X,
          handler: 'index.handler',
          role: authLambdaRole,
          code: lambda.Code.fromAsset(path.join(__dirname, './functions/auth-handler')),
        },
      );

      return authLambdaAtEdge;
    }
    return undefined;
  };

  constructor(scope: Construct, id: string, props?: NomopomoCfS3StackProps) {
    super(scope, id, props);

    // Create the S3 bucket
    const websiteBucket = new s3.Bucket(this, `nomopomo-web-bucket-resource-${props.environmentConfig.environment}`, {
      bucketName: `nomopomo-web-static-${props.environmentConfig.environment}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      enforceSSL: true,
    });

    const lambdaAuthorizer = this.provisionLambdaAuthorizer(props.environmentConfig);

    // Create CloudFront distribution
    const distribution = new cloudfront.Distribution(
      this,
      `nomopomo-cfn-distribution-${props.environmentConfig.environment}`,
      {
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessControl(websiteBucket),
          edgeLambdas: lambdaAuthorizer && [
            {
              functionVersion: lambdaAuthorizer.currentVersion,
              eventType: cloudfront.LambdaEdgeEventType.VIEWER_REQUEST,
            },
          ],
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
          compress: true,
        },
        defaultRootObject: 'index.html',
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      },
    );

    // Output the CloudFront URL
    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: distribution.distributionDomainName,
      description: 'Website URL',
    });

    new cdk.CfnOutput(this, 'S3ObjectDomainName', {
      value: websiteBucket.bucketDomainName,
      description: 'Bucket URL',
    });

    new s3deploy.BucketDeployment(this, `DeployNomopomoStaticAssets-${props.environmentConfig.environment}`, {
      sources: [s3deploy.Source.asset('../../dist/packages/nomopomo')],
      destinationBucket: websiteBucket,
      distribution: distribution,
      distributionPaths: ['/*'],
    });

    cdk.Tags.of(this).add('Environment', props.environmentConfig.environment);
    cdk.Tags.of(this).add('Project', 'nomopomo');
    cdk.Tags.of(this).add('ManagedBy', 'CDK');
    cdk.Tags.of(this).add('Author', 'George Boktor');
  }
}

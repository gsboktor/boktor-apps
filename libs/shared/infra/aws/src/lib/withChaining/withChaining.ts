import * as cdk from 'aws-cdk-lib';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';

import { Construct } from 'constructs';
import { withBucketDeployment, WithBucketDeploymentParams } from '../withBucketDeployment';

export interface EnvironmentConfig {
  environment: 'dev' | 'staging' | 'prod';
  domainName: string;
  subDomain?: string;
  hostedZoneId?: string;
  certificateArn?: string;
  basicAuthUsername?: string; // Optional basic auth credentials
  basicAuthPassword?: string;
}

export type Context = {
  ctx: Construct;
  config: EnvironmentConfig;
  resources: Record<string, Construct>;
};

export type ChainableConstructs = {
  withS3: (params?: WithS3Params) => void;
  withCloudFront: <T extends cdk.Resource>(params: WithCloudFrontParams<T>) => void;
  withBucketDeployment: (params: WithBucketDeploymentParams) => void;
  outputs: (params: OutputsParams) => void;
};

export function Chainable(
  scope: Construct,
  config: EnvironmentConfig,
  tags?: Record<string, string | number | object>,
): ChainableConstructs {
  const context = {
    ctx: scope,
    config: config,
  } as Context;

  tags &&
    Object.entries(tags).forEach(([k, v]) => {
      if (typeof v === 'object') {
        cdk.Tags.of(scope).add(k, JSON.stringify(v));
      } else {
        const sV = String(v);
        sV.length > 0 ? cdk.Tags.of(scope).add(k, sV) : cdk.Tags.of(scope).add(k, 'null');
      }
    });

  return {
    withS3: withS3.bind(context),
    withCloudFront: withCloudFront.bind(context),
    withBucketDeployment: withBucketDeployment.bind(context),
    outputs: outputs.bind(context),
  };
}

interface OutputsParams {
  key: string;
  value: string;
  description: string;
}

export function outputs(this: Context, { key, value, description }: OutputsParams) {
  new cdk.CfnOutput(this.ctx, key, {
    value,
    description,
  });
}

interface WithS3Params {
  then?: ({ bucket }: { bucket: s3.Bucket }) => void;
}

export function withS3(this: Context, { then }: WithS3Params = {}) {
  const bucket = new s3.Bucket(this.ctx, `${this.config.domainName}-web-bucket-resource-${this.config.environment}`, {
    bucketName: `${this.config.domainName}-web-static-${this.config.environment}`,
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

  then?.({ bucket });
}

interface WithCloudFrontParams<T extends cdk.Resource> {
  source: T;
  then?: ({ distro }: { distro: cf.Distribution }) => void;
  plugins?: [{ authorizer?: cf.experimental.EdgeFunction | (() => cf.experimental.EdgeFunction) }];
}

export function withCloudFront<TSource extends cdk.Resource>(
  this: Context,
  { source, then, plugins }: WithCloudFrontParams<TSource>,
) {
  let auth: cf.experimental.EdgeFunction | undefined = undefined;

  if (plugins) {
    const [{ authorizer }] = plugins;
    auth = typeof authorizer === 'function' ? authorizer?.() : authorizer;
  }

  const distro = new cf.Distribution(
    this.ctx,
    `${this.config.domainName}-cfn-distribution-${this.config.environment}`,
    {
      defaultBehavior: {
        origin:
          source instanceof s3.Bucket
            ? origins.S3BucketOrigin.withOriginAccessControl(source)
            : ({} as origins.S3BucketOrigin),
        edgeLambdas: auth && [
          {
            functionVersion: auth.currentVersion,
            eventType: cf.LambdaEdgeEventType.VIEWER_REQUEST,
          },
        ],
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cf.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cf.CachedMethods.CACHE_GET_HEAD,
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

  then?.({ distro });
}

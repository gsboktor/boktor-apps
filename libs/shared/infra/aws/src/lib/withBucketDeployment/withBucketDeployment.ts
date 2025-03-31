import * as cdk from 'aws-cdk-lib';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Context } from '../withChaining/withChaining';

export interface WithBucketDeploymentParams {
  assetPath: string;
  bucket: s3.Bucket;
  distribution: cf.Distribution;
  then?: ({ dp }: { dp: cdk.aws_s3_deployment.BucketDeployment }) => void;
}

export function withBucketDeployment(
  this: Context,
  { assetPath, bucket, distribution, then }: WithBucketDeploymentParams,
) {
  const dp = new s3deploy.BucketDeployment(
    this.ctx,
    `Deploy${this.config.domainName}StaticAssets-${this.config.environment}`,
    {
      sources: [s3deploy.Source.asset(assetPath)],
      destinationBucket: bucket,
      distribution: distribution,
      distributionPaths: ['/*'],
    },
  );
  then?.({ dp });
}

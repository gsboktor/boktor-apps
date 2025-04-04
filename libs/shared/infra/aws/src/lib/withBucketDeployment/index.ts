import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import { Context, WithBucketDeploymentParams } from '../types';

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
  then?.({ out: dp });
}

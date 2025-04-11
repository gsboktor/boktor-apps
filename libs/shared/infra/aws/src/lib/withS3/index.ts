import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { WithS3Params } from '../types/chainable';
import { Context } from '../types/environment';

export function withS3(this: Context, { then }: WithS3Params = {}) {
  const bucket = new s3.Bucket(this.ctx, `${this.config.domainName}-web-bucket-resource-${this.config.environment}`, {
    bucketName: `${this.config.domainName}-web-static-${this.config.environment}`,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    websiteErrorDocument: 'index.html',
    websiteIndexDocument: 'index.html',
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

  then?.({ out: bucket });
}

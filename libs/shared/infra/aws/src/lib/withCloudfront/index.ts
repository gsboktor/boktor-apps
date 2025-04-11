import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { WithCloudFrontParams } from '../types';
import { Context } from '../types/environment';

export function withCloudFront<TOrigin extends Construct>(
  this: Context,
  { source, certificateArn, then, plugins }: WithCloudFrontParams<TOrigin>,
) {
  let auth: cf.experimental.EdgeFunction | undefined = undefined;

  if (!(source instanceof s3.Bucket)) {
    throw new Error('[withCloudfront]: Non-bucket origin currently not supported\n');
  }

  if (plugins) {
    const [{ authorizer }] = plugins;
    auth = typeof authorizer === 'function' ? authorizer?.() : authorizer;
  }
  const fullDomainName = this.config.subDomain ? `${this.config.subDomain}.${this.config.domainName}` : this.config.domainName;

  const distro = new cf.Distribution(this.ctx, `${this.config.domainName}-cfn-distribution-${this.config.environment}`, {
    defaultBehavior: {
      origin: origins.S3BucketOrigin.withOriginAccessControl(source),
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
    domainNames: certificateArn ? [fullDomainName] : undefined,
    certificate: certificateArn ? acm.Certificate.fromCertificateArn(this.ctx, 'DistributionCertificate', certificateArn) : undefined,
    defaultRootObject: 'index.html',
    errorResponses: [
      {
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
      },
      {
        httpStatus: 403,
        responseHttpStatus: 200,
        responsePagePath: '/index.html',
      },
    ],
  });

  then?.({ out: distro });
}

import { Chainable } from '@boktor-apps/shared/infra/aws';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config';

interface BoktorPortfolioStackProps extends cdk.StackProps {
  environmentConfig: EnvironmentConfig;
}
export class BoktorPortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BoktorPortfolioStackProps) {
    super(scope, id, props);

    const { withS3, withCloudFront, withBucketDeployment, outputs } = Chainable(this, props.environmentConfig, {
      Author: 'George',
      Project: props.environmentConfig.domainName,
      ManagedBy: 'CDK',
      Env: props.environmentConfig.environment,
    });

    withS3({
      then: ({ bucket }) => {
        withCloudFront<cdk.aws_s3.Bucket>({
          source: bucket,
          then: ({ distro }) => {
            withBucketDeployment({
              bucket: bucket,
              distribution: distro,
              assetPath: '../../dist/packages/boktor-portfolio',
              then: () => {
                outputs({ key: 'Distribution', value: distro.domainName, description: 'Domain of website' });
                outputs({ key: 'BucketDomainName', value: bucket.bucketDomainName, description: 'Domain of bucket' });
              },
            });
          },
        });
      },
    });
  }
}

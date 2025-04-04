import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib/core';

import { Chainable } from '@boktor-apps/shared/infra/aws';
import { Construct } from 'constructs';
import { EnvironmentConfig } from '../config';

interface BoktorPortfolioStackProps extends cdk.StackProps {
  environmentConfig: EnvironmentConfig;
}
export class BoktorPortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: BoktorPortfolioStackProps) {
    super(scope, id, props);

    const { withS3, withCloudFront, withBucketDeployment, outputs, withCertificate, withHostedZone, withRoute53 } = Chainable(
      this,
      props.environmentConfig,
      {
        Author: 'George',
        Project: props.environmentConfig.domainName,
        ManagedBy: 'CDK',
        Env: props.environmentConfig.environment,
      },
    );

    withS3({
      then: ({ out: bucket }) => {
        withHostedZone({
          then: ({ out: hostedZone }) => {
            withCertificate({
              hostedZone,
              then: ({ out: certificate }) => {
                withCloudFront<s3.Bucket>({
                  source: bucket,
                  certificateArn: certificate.certificateArn,
                  then: ({ out: distro }) => {
                    withRoute53({
                      distribution: distro,
                      hostedZone,
                    });

                    withBucketDeployment({
                      bucket: bucket,
                      distribution: distro,
                      assetPath: '../../dist/packages/boktor-portfolio',
                      then: () => {
                        outputs({
                          key: 'Distribution',
                          value: distro.domainName,
                          description: 'Domain of website',
                        });
                        outputs({
                          key: 'BucketDomainName',
                          value: bucket.bucketDomainName,
                          description: 'Domain of bucket',
                        });
                        outputs({
                          key: 'CustomDomain',
                          value: props.environmentConfig.subDomain
                            ? `${props.environmentConfig.subDomain}.${props.environmentConfig.domainName}`
                            : props.environmentConfig.domainName,
                          description: 'Custom domain for the website',
                        });
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  }
}

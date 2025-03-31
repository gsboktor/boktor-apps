import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Chainable } from './withChaining';

class ChainableTestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const { withS3, withBucketDeployment, withCloudFront, outputs } = Chainable(
      this,
      {
        environment: 'dev',
        domainName: 'test-domain',
      },
      {
        Author: 'George',
        Num: 1233,
        Obj: {
          test: 123,
          testing: '345',
        },
      },
    );

    // Create the infrastructure chain
    withS3({
      then: ({ bucket: webBucket }) => {
        withCloudFront<cdk.aws_s3.Bucket>({
          source: webBucket,
          then: ({ distro }) => {
            withBucketDeployment({
              assetPath: './libs/shared/infra/aws/src/lib/withChaining/asset',
              bucket: webBucket,
              distribution: distro,
              then: ({ dp }) => {
                outputs({
                  key: 'BucketArn',
                  value: webBucket.bucketArn,
                  description: 'S3 Bucket ARN',
                });
                outputs({
                  key: 'Deployed',
                  value: dp.deployedBucket.bucketName,
                  description: 'Deployed bucket name',
                });
              },
            });
          },
        });
      },
    });
  }
}

describe('Chainable Infrastructure Test', () => {
  let app: cdk.App;
  let stack: ChainableTestStack;
  let template: Template;

  beforeEach(() => {
    app = new cdk.App();
    stack = new ChainableTestStack(app, 'ChainableTestStack');
    template = Template.fromStack(stack);
  });

  test('creates S3 bucket with correct properties', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      BucketName: 'test-domain-web-static-dev',
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: false,
        BlockPublicPolicy: false,
        IgnorePublicAcls: false,
        RestrictPublicBuckets: false,
      },
    });
  });

  test('creates CloudFront distribution with correct properties', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        DefaultRootObject: 'index.html',
        Enabled: true,
        DefaultCacheBehavior: {
          ViewerProtocolPolicy: 'redirect-to-https',
          AllowedMethods: ['GET', 'HEAD'],
          CachedMethods: ['GET', 'HEAD'],
          Compress: true,
        },
        CustomErrorResponses: [
          {
            ErrorCode: 404,
            ResponseCode: 200,
            ResponsePagePath: '/index.html',
          },
        ],
      },
    });
  });

  test('creates bucket deployment', () => {
    template.hasResourceProperties('Custom::CDKBucketDeployment', {
      DistributionPaths: ['/*'],
    });
  });

  test('creates output with bucket ARN', () => {
    const outputs = template.findOutputs('BucketArn');
    expect(outputs).toBeDefined();
    expect(outputs.BucketArn.Description).toBe('S3 Bucket ARN');
    expect(outputs.BucketArn.Value).toBeDefined();
  });

  test('creates resources with correct tags', () => {
    const expectedTags = {
      Author: 'George',
      Num: '1233',
      Obj: '{"test":123,"testing":"345"}',
    };

    template.hasResourceProperties('AWS::S3::Bucket', {
      Tags: Match.arrayWith([
        {
          Key: 'Author',
          Value: expectedTags.Author,
        },
        {
          Key: 'Num',
          Value: expectedTags.Num,
        },
        {
          Key: 'Obj',
          Value: expectedTags.Obj,
        },
      ]),
    });
  });
});

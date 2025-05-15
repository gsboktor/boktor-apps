/**
 * Base interface for chainable infrastructure parameters
 * @template TOutput - The CDK Construct type that will be output by the chain
 * @template TOrigin - Cloudfront-specific origin resource type annoation. Extends CDK Construct types
 * @property "then" - Optional callback function that receives the output resource
 * @example
 * // Basic usage with S3 bucket output
 * withS3({
 *   then: ({ out: bucket }) => {
 *     // Use the bucket resource
 *   }
 * });
 *
 * @example
 * // Basic usage with Cloudfront and origin annotation
 * withCloudfront<s3.Bucket>({
 *   then: ({out: distro}) => {
 *     // Manage or use distro resource
 *   }
 * });
 */
import { Construct } from 'constructs';

import { aws_cognito } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cf from 'aws-cdk-lib/aws-cloudfront';
import { IdentityPoolProviderType } from 'aws-cdk-lib/aws-cognito-identitypool';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Deploy from 'aws-cdk-lib/aws-s3-deployment';
export * as cognito from 'aws-cdk-lib/aws-cognito';

type ChainCallback<TOutput> = ({ out }: { out: TOutput }) => void;

export interface ChainableBaseParams<TOutput extends Construct | Construct[]> {
  then?: ChainCallback<TOutput>;
}

/**
 * @description
 * Construct specific plugins
 *
 * @example
 * withCloudfront<s3.Bucket>({
 *   then: ({out: distro}) => {
 *      // Manage or use distro resource
 *   },
 *   plugins: [
 *     {
 *       authorizer: getLambdaAuthorizer()
 *     }
 *   ]
 * });
 */

interface CloudFrontPlugins {
  authorizer?: cf.experimental.EdgeFunction | (() => cf.experimental.EdgeFunction);
}

type IdentityProviderConfig = {
  clientId: string;
  clientSecret: string;
};
export interface CognitoPlugins {
  identityProviders?: Partial<{ [Provider in IdentityPoolProviderType]: IdentityProviderConfig }>;
}

/**
 * @description
 * Construct chainable config types
 */

interface WithCloudFrontConfig<TOrigin extends Construct> {
  source: TOrigin;
  certificateArn?: string;
  plugins?: [CloudFrontPlugins];
}

interface WithBucketDeploymentConfig {
  assetPath: string;
  bucket: s3.Bucket;
  distribution: cf.Distribution;
  limit?: number;
}

interface WithCertificateConfig {
  hostedZone: route53.IHostedZone;
}

interface WithRoute53Config {
  distribution: cf.Distribution;
  hostedZone: route53.IHostedZone;
}

interface WithCognitoConfig {
  userPoolName: string;
  passwordLength: number;
  plugins?: CognitoPlugins;
}

export type WithS3Params = ChainableBaseParams<s3.Bucket>;
export type WithCloudFrontParams<TOrigin extends Construct> = ChainableBaseParams<cf.Distribution> & WithCloudFrontConfig<TOrigin>;
export type WithBucketDeploymentParams = ChainableBaseParams<s3Deploy.BucketDeployment> & WithBucketDeploymentConfig;
export type WithCertificateParams = ChainableBaseParams<acm.Certificate> & WithCertificateConfig;
export type WithHostedZoneParams = ChainableBaseParams<route53.IHostedZone>;
export type WithRoute53Params = ChainableBaseParams<route53.ARecord> & WithRoute53Config;
export type WithCognitoParams = ChainableBaseParams<[aws_cognito.UserPool, aws_cognito.UserPoolClient]> & WithCognitoConfig;

export type OutputsParams = {
  key: string;
  value: string;
  description: string;
};

export type ChainableConstructs = {
  withS3: (params?: WithS3Params) => void;
  withCloudFront: <TOrigin extends Construct>(params: WithCloudFrontParams<TOrigin>) => void;
  withBucketDeployment: (params: WithBucketDeploymentParams) => void;
  withHostedZone: (params?: WithHostedZoneParams) => void;
  withRoute53: (params: WithRoute53Params) => void;
  withCertificate: (params: WithCertificateParams) => void;
  withGroup?: (params: ChainableBaseParams<Construct[]>) => void;
  withCognito?: (params: WithCognitoParams) => void;
  outputs: (params: OutputsParams) => void;
};

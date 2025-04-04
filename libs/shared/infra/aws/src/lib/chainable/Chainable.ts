import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { outputs } from '../outputs';
import { ChainableBaseParams, ChainableConstructs } from '../types/chainable';
import { Context, EnvironmentConfig } from '../types/environment';
import { withBucketDeployment } from '../withBucketDeployment';
import { withCertificate } from '../withCertificate';
import { withCloudFront } from '../withCloudfront';
import { withHostedZone } from '../withHostedZone';
import { withRoute53 } from '../withRoute53';
import { withS3 } from '../withS3';

type ValidTags = Record<string, string | number | object>;

function appendTags(scope: Construct, tags?: ValidTags) {
  tags &&
    Object.entries(tags).forEach(([k, v]) => {
      if (typeof v === 'object') {
        cdk.Tags.of(scope).add(k, JSON.stringify(v));
      } else {
        const stringValue = String(v);
        stringValue.length > 0 ? cdk.Tags.of(scope).add(k, stringValue) : cdk.Tags.of(scope).add(k, 'null');
      }
    });
}

export function Chainable(scope: Construct, config: EnvironmentConfig, tags?: ValidTags): ChainableConstructs {
  const context = {
    ctx: scope,
    config: config,
  } as Context;

  appendTags(scope, tags);

  return {
    withS3: withS3.bind(context),
    withCloudFront: withCloudFront.bind(context),
    withBucketDeployment: withBucketDeployment.bind(context),
    withHostedZone: withHostedZone.bind(context),
    withRoute53: withRoute53.bind(context),
    withCertificate: withCertificate.bind(context),
    outputs: outputs.bind(context),
  };
}

export function createAbstraction<C extends Construct, T extends ChainableBaseParams<C>>(this: Context) {
  return function () {
    console.log();
  };
}

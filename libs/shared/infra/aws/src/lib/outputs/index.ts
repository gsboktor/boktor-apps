import * as cdk from 'aws-cdk-lib';
import { OutputsParams } from '../types';
import { Context } from '../types/environment';

export function outputs(this: Context, { key, value, description }: OutputsParams) {
  new cdk.CfnOutput(this.ctx, key, {
    value,
    description,
  });
}

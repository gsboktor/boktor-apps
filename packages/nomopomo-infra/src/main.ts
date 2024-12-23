#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';

import { getEnvironmentConfig } from './config';
import { NomopomoCfS3Stack } from './stacks';

dotenv.config();

const app = new cdk.App();

const envConfig = getEnvironmentConfig(process.env.NODE_ENV);

new NomopomoCfS3Stack(app, `NomopomoCfS3Stack-${envConfig.environment}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  environmentConfig: envConfig,
});

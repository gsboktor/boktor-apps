#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';

import { getEnvironmentConfig } from './config';
import { BoktorPortfolioStack } from './stacks/boktor-portfolio-stack';

dotenv.config();

const app = new cdk.App();
const envConfig = getEnvironmentConfig(app.node.tryGetContext('env'));

new BoktorPortfolioStack(app, `BoktorPortfolioCfS3Stack-${envConfig.environment}`, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  environmentConfig: envConfig,
});

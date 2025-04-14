import { Construct } from 'constructs';

export interface EnvironmentConfig {
  environment: 'dev' | 'staging' | 'prod';
  domainName: string;
  subDomain?: string;
  hostedZoneId?: string;
  certificateArn?: string;
  basicAuthUsername?: string; // Optional basic auth credentials
  basicAuthPassword?: string;
}

export type Context = {
  ctx: Construct;
  config: EnvironmentConfig;
  resources: Record<string, Construct>;
};

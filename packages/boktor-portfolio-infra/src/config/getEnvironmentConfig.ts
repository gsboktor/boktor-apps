export interface EnvironmentConfig {
  environment: 'dev' | 'staging' | 'prod';
  domainName: string;
  subDomain?: string;
  hostedZoneId?: string;
  certificateArn?: string;
  basicAuthUsername?: string; // Optional basic auth credentials
  basicAuthPassword?: string;
}

export const getEnvironmentConfig = (context: string): EnvironmentConfig => {
  const contextEnv = context;

  const enviornmentMapper: Record<string, EnvironmentConfig> = {
    ['development']: {
      environment: 'dev',
      domainName: 'georgeboktor.io',
      subDomain: 'dev',
      basicAuthUsername: process.env.LAMBDA_BASIC_AUTH_USERNAME,
      basicAuthPassword: process.env.LAMBDA_BASIC_AUTH_PASSWORD,
    },
    ['production']: {
      environment: 'prod',
      domainName: 'georgeboktor.io',
    },
  };

  return enviornmentMapper[contextEnv];
};

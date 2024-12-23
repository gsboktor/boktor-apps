export interface EnvironmentConfig {
  environment: 'dev' | 'staging' | 'prod';
  domainName: string;
  subDomain?: string;
  hostedZoneId?: string;
  certificateArn?: string;
  allowedIps?: string[]; // List of allowed IP CIDR ranges
  basicAuthUsername?: string; // Optional basic auth credentials
  basicAuthPassword?: string;
}

export const getEnvironmentConfig = (context: string): EnvironmentConfig => {
  const contextEnv = context;

  const enviornmentMapper: Record<string, EnvironmentConfig> = {
    ['development']: {
      environment: 'dev',
      domainName: 'nomopomo.io',
      subDomain: 'dev',
      basicAuthUsername: process.env.LAMBDA_BASIC_AUTH_USERNAME,
      basicAuthPassword: process.env.LAMBDA_BASIC_AUTH_PASSWORD,
    },
    ['production']: {
      environment: 'prod',
      domainName: 'nomopomo.io',
    },
  };

  return enviornmentMapper[contextEnv];
};

export const getDomainName = (config: EnvironmentConfig): string => {
  if (config.subDomain) {
    return `${config.subDomain}.${config.domainName}`;
  }
  return config.domainName;
};

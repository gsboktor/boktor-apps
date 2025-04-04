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
      domainName: 'georgeboktor.me',
      subDomain: 'dev',
      hostedZoneId: 'Z03586791PPKQOUHDUV9J',
    },
    ['production']: {
      environment: 'prod',
      domainName: 'georgeboktor.me',
      hostedZoneId: 'Z03586791PPKQOUHDUV9J',
    },
  };

  return enviornmentMapper[contextEnv];
};

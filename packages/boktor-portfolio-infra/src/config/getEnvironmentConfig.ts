import { EnvironmentConfig } from '@boktor-apps/shared/infra/aws';

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

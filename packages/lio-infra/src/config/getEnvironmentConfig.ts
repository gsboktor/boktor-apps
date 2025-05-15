import { LioEnvConfig } from '../types/LioEnvConfig';

export const getEnvironmentConfig = (context: string): LioEnvConfig => {
  const contextEnv = context;

  const enviornmentMapper: Record<string, LioEnvConfig> = {
    ['development']: {
      environment: 'dev',
      domainName: 'lio.io',
      subDomain: 'dev',
      googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    },
    ['production']: {
      environment: 'prod',
      domainName: 'lio.io',
      googleClientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      googleClientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    },
  };

  return enviornmentMapper[contextEnv];
};

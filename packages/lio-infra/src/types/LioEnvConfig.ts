import { EnvironmentConfig } from '@boktor-apps/shared/infra/aws';

export interface LioEnvConfig extends EnvironmentConfig {
  googleClientId: string;
  googleClientSecret: string;
}

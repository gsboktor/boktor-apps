import { Chainable } from '@boktor-apps/shared/infra/aws';
import * as cdk from 'aws-cdk-lib';
import { IdentityPoolProviderType } from 'aws-cdk-lib/aws-cognito-identitypool';
import { Construct } from 'constructs';
import { LioEnvConfig } from '../types/LioEnvConfig';

interface LioAuthStackProps extends cdk.StackProps {
  environmentConfig: LioEnvConfig;
}

export class LioAuthCognitoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: LioAuthStackProps) {
    super(scope, id, props);

    const { withCognito, outputs } = Chainable(this, props.environmentConfig, {
      Author: 'George Boktor',
      Project: props.environmentConfig.domainName,
      ManagedBy: 'CDK',
      Env: props.environmentConfig.environment,
    });

    withCognito({
      userPoolName: 'lio-users',
      passwordLength: 6,
      then: ({ out: [userPool, userPoolClient] }) => {
        outputs({ key: 'UserPool ARN', value: userPool.userPoolArn, description: 'user pool ARN' });
        outputs({ key: 'UserPool URL', value: userPool.userPoolProviderUrl, description: 'user pool URL' });
        outputs({
          key: 'UserPool Providers',
          value: JSON.stringify(
            (() => {
              return userPool.identityProviders.map((idp) => idp.providerName);
            })(),
          ),
          description: 'user pool Providers',
        });
        outputs({ key: 'UserPool Client ID', value: userPoolClient.userPoolClientId, description: 'user pool client ID' });
        outputs({ key: 'UserPool Client Name', value: userPoolClient.userPoolClientName, description: 'user pool client NAME' });
      },
      plugins: {
        identityProviders: {
          [IdentityPoolProviderType.GOOGLE]: {
            clientId: props.environmentConfig.googleClientId,
            clientSecret: props.environmentConfig.googleClientSecret,
          },
        },
      },
    });
  }
}

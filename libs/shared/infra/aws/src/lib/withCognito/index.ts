import * as cdk from 'aws-cdk-lib';
import { aws_cognito } from 'aws-cdk-lib';
import { IdentityPoolProviderType } from 'aws-cdk-lib/aws-cognito-identitypool';
import { Context, WithCognitoParams } from '../types';

const C_DEFAULTS: (PASS_MIN: number) => Partial<cdk.aws_cognito.UserPoolProps> = (PASS_MIN: number) => ({
  standardAttributes: {
    email: {
      required: true,
      mutable: false,
    },
    preferredUsername: {
      required: true,
      mutable: true,
    },
  },
  passwordPolicy: {
    minLength: PASS_MIN,
    requireSymbols: true,
  },
  signInAliases: {
    email: true,
    username: true,
  },
});

export function withCognito(this: Context, { then, userPoolName, passwordLength, plugins }: WithCognitoParams) {
  let userPool: aws_cognito.UserPool | undefined = undefined;
  let userPoolClient: aws_cognito.UserPoolClient | undefined = undefined;

  const attachedProviders: aws_cognito.UserPoolIdentityProvider[] = [];
  const supportedIdps: aws_cognito.UserPoolClientIdentityProvider[] = [];

  userPool = new aws_cognito.UserPool(this.ctx, `${this.config.domainName}-cognito-userpool-resource-${this.config.environment}`, {
    userPoolName: userPoolName,
    selfSignUpEnabled: true,
    accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY,
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    userVerification: {
      emailStyle: aws_cognito.VerificationEmailStyle.CODE,
    },
    ...C_DEFAULTS(passwordLength),
  });

  if (plugins && plugins.identityProviders) {
    for (const [providerType, providerConfig] of Object.entries(plugins.identityProviders)) {
      switch (providerType) {
        case IdentityPoolProviderType.GOOGLE: {
          const googleProvider = new aws_cognito.UserPoolIdentityProviderGoogle(
            this.ctx,
            `${this.config.domainName}-google-idp-${this.config.environment}`,
            {
              clientId: providerConfig.clientId,
              clientSecretValue: cdk.SecretValue.unsafePlainText(providerConfig.clientSecret),
              userPool: userPool,
              scopes: ['email', 'profile', 'openid'],
              attributeMapping: {
                email: aws_cognito.ProviderAttribute.GOOGLE_EMAIL,
                preferredUsername: aws_cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
                profilePicture: aws_cognito.ProviderAttribute.GOOGLE_PICTURE,
              },
            },
          );

          userPool.registerIdentityProvider(googleProvider);

          attachedProviders.push(googleProvider);
          supportedIdps.push(aws_cognito.UserPoolClientIdentityProvider.GOOGLE);

          break;
        }
      }
    }
  }

  userPoolClient = new aws_cognito.UserPoolClient(
    this.ctx,
    `${this.config.domainName}-cognito-userpool-client-resource-${this.config.environment}`,
    {
      userPool,
      userPoolClientName: `${userPoolName}-client-with-oauth`,
      preventUserExistenceErrors: true,
      accessTokenValidity: cdk.Duration.days(1),
      refreshTokenValidity: cdk.Duration.days(7),
      oAuth: {
        callbackUrls: ['http://localhost:4203/auth/callback', 'http://localhost:5173/auth/callback'],
        defaultRedirectUri: 'http://localhost:4203/auth/callback',
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [aws_cognito.OAuthScope.EMAIL, aws_cognito.OAuthScope.PROFILE, aws_cognito.OAuthScope.OPENID],
      },
      supportedIdentityProviders: [...(supportedIdps && supportedIdps), aws_cognito.UserPoolClientIdentityProvider.COGNITO],
    },
  );

  if (attachedProviders.length > 0) {
    attachedProviders.forEach((p) => {
      userPoolClient.node.addDependency(p);
    });
  }

  then?.({ out: [userPool, userPoolClient] });
}

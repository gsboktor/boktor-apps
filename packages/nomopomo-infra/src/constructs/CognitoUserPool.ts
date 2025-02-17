import * as cdk from 'aws-cdk-lib';
import * as awsCognito from 'aws-cdk-lib/aws-cognito';
import { Construct } from 'constructs';

export interface CognitoUserPoolProps {
  id: string;
  env: string;
}
export class CognitoUserPool extends Construct {
  public readonly userPool: awsCognito.UserPool;
  public readonly userPoolClient: awsCognito.UserPoolClient;

  constructor(scope: Construct, props: CognitoUserPoolProps) {
    super(scope, props.id);
    this.userPool = new awsCognito.UserPool(scope, `nomopomo-${props.env}-web-user-pool-resource`, {
      userPoolName: `nomopomo-${props.env}-web-user-pool`,
      selfSignUpEnabled: true,
      accountRecovery: awsCognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      userVerification: {
        emailStyle: awsCognito.VerificationEmailStyle.CODE,
      },
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
        minLength: 8,
        requireSymbols: true,
      },
      signInAliases: {
        email: true,
        username: true,
      },
    });

    this.userPoolClient = new awsCognito.UserPoolClient(scope, `nomopomo-${props.env}-web-user-pool-client-resource`, {
      userPoolClientName: `nomopomo-${props.env}-web-user-pool-client`,
      userPool: this.userPool,
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
    });
  }
}

import {
  AuthFlowType,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  SignUpCommand,
  SignUpCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { SignInPayload, SignUpPayload } from './AuthService';

export interface AuthClient {
  signIn: (payload: SignInPayload) => Promise<InitiateAuthCommandOutput>;
  signUp: (payload: SignUpPayload) => Promise<SignUpCommandOutput>;
}

export type ClientCredentials = {
  clientId: string;
  userPoolId: string;
  region: string;
};

export class CognitoAuthClient implements AuthClient {
  private cognitoClient: CognitoIdentityProviderClient;
  private cognitoClientId: string;
  private cognitoUserPoolId: string;

  constructor(config: ClientCredentials) {
    this.cognitoClient = new CognitoIdentityProviderClient({ region: config.region });
    this.cognitoClientId = config.clientId;
    this.cognitoUserPoolId = config.userPoolId;
  }

  public signIn = async (payload: SignInPayload) => {
    const cmd = new InitiateAuthCommand({
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      ClientId: this.cognitoClientId,
      AuthParameters: {
        USERNAME: payload.username,
        PASSWORD: payload.password,
      },
    });

    return await this.cognitoClient.send(cmd);
  };
  signUp = async (payload: SignUpPayload) => {
    const cmd = new SignUpCommand({
      ClientId: this.cognitoClientId,
      Username: payload.username,
      Password: payload.password,
      UserAttributes: [
        {
          Name: 'email',
          Value: payload.email,
        },
      ],
    });

    return await this.cognitoClient.send(cmd);
  };
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AdminCreateUserCommand,
  AdminGetUserCommand,
  AdminInitiateAuthCommand,
  AdminSetUserPasswordCommand,
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  UserNotConfirmedException,
} from '@aws-sdk/client-cognito-identity-provider';
import { randomUUID } from 'crypto';
import { Credentials } from 'google-auth-library';
import { GoogleService } from './google.service';
import { decodeJwt } from './utils';

@Injectable()
export class CognitoService {
  private cognitoClient: CognitoIdentityProviderClient;
  private cognitoClientId: string;
  private cognitoUserPoolId: string;

  constructor(private configService: ConfigService, private googleService: GoogleService) {
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: this.configService.get<string>('NX_PUBLIC_AWS_REGION'),
    });

    this.cognitoClientId = this.configService.get<string>('NX_PUBLIC_COGNITO_CLIENT_ID');
    this.cognitoUserPoolId = this.configService.get<string>('NX_PUBLIC_COGNITO_USER_POOL_ID');
  }

  async initiateSignIn(email: string, password: string) {
    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.cognitoClientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    });

    try {
      return await this.cognitoClient.send(command);
    } catch (error) {
      if (error instanceof UserNotConfirmedException) {
        console.error('ERROR', error.message);
        throw error;
      }
      throw error;
    }
  }

  async validateExistingUser(email: string) {
    try {
      const command = new AdminGetUserCommand({
        UserPoolId: this.cognitoUserPoolId,
        Username: email,
      });

      await this.cognitoClient.send(command);
      return true;
    } catch (error) {
      if (error.name === 'UserNotFoundException') {
        return false;
      }
      throw error;
    }
  }

  async initiateSignUp(email: string, password: string, user_name: string) {
    const command = new SignUpCommand({
      ClientId: this.cognitoClientId,
      Username: user_name,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'preferred_username', Value: user_name },
      ],
    });

    try {
      const res = await this.cognitoClient.send(command);
      console.log('RESPONSE =>', JSON.stringify(res, null, 2));
    } catch (error) {
      console.error('ERROR IN SIGN UP', JSON.stringify(error));
      throw error;
    }
  }

  async handleTokenExchange(tokens: Credentials) {
    if (!tokens.id_token) {
      throw new Error('No ID token received from Google');
    }

    const userProps = decodeJwt(tokens.id_token) as { email: string; name: string };
    if (!userProps.email) throw new Error('No email');

    console.log('USER PROPS =>', userProps);

    // Exchange Google ID token for Cognito tokens
    try {
      const command = new AdminCreateUserCommand({
        UserPoolId: this.cognitoUserPoolId,
        Username: userProps.name.split(' ').join(''),
        UserAttributes: [{ Name: 'email', Value: userProps.email }],
        MessageAction: 'SUPPRESS',
      });

      await this.cognitoClient.send(command);

      const tempPassword = randomUUID();

      const setPasswordCommand = new AdminSetUserPasswordCommand({
        UserPoolId: this.cognitoUserPoolId,
        Username: userProps.name.split(' ').join(''),
        Password: tempPassword,
        Permanent: true,
      });

      await this.cognitoClient.send(setPasswordCommand);

      const authCommand = new AdminInitiateAuthCommand({
        UserPoolId: this.cognitoUserPoolId,
        ClientId: this.cognitoClientId,
        AuthFlow: 'ADMIN_NO_SRP_AUTH',
        AuthParameters: {
          USERNAME: userProps.name.split(' ').join(''),
          PASSWORD: tempPassword || tokens.id_token, // Use the password if we created it, otherwise try the token
        },
      });

      const authResult = await this.cognitoClient.send(authCommand);

      return {
        access_token: authResult.AuthenticationResult.AccessToken,
        refresh_token: authResult.AuthenticationResult.RefreshToken,
        id_token: authResult.AuthenticationResult.IdToken,
      };
    } catch (e) {
      console.log('Error exchanging tokens', JSON.stringify(e));
      throw e;
    }
  }
}

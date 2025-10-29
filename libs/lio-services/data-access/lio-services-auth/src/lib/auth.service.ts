import { Injectable } from '@nestjs/common';
import { CognitoService } from './cognito.service';
import { GoogleService } from './google.service';

@Injectable()
export class AuthService {
  constructor(private readonly cognitoService: CognitoService, private readonly googleService: GoogleService) {}

  async signIn(LoginCredentials: { email: string; password: string }) {
    await this.cognitoService.initiateSignIn(LoginCredentials.email, LoginCredentials.password);
  }

  async signUp(SignUpCredentials: { email: string; password: string; user_name: string }) {
    await this.cognitoService.initiateSignUp(SignUpCredentials.email, SignUpCredentials.password, SignUpCredentials.user_name);
  }

  async getGoogleAuthUrl() {
    return await this.googleService.getGoogleAuthUrl();
  }

  async handleGoogleCallback(code: string) {
    const tokens = await this.googleService.handleGoogleRedirect(code);

    return await this.cognitoService.handleTokenExchange(tokens);
  }
}

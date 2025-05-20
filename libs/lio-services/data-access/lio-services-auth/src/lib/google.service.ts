import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleService {
  private googleOAuthClient: OAuth2Client;

  constructor(private configService: ConfigService) {
    this.googleOAuthClient = new OAuth2Client({
      clientId: this.configService.get<string>('NX_PUBLIC_GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get<string>('NX_PUBLIC_GOOGLE_CLIENT_SECRET'),
      redirectUri: this.configService.get<string>('NX_PUBLIC_GOOGLE_REDIRECT_URI'),
    });
  }

  async getGoogleAuthUrl() {
    try {
      const url = this.googleOAuthClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['email', 'profile', 'openid'],
        prompt: 'consent',
      });

      return url;
    } catch (e) {
      console.error('Encountered google oauth error', JSON.stringify(e));
      throw e;
    }
  }

  async handleGoogleRedirect(code: string) {
    const { tokens } = await this.googleOAuthClient.getToken(code);

    if (!tokens.id_token) {
      throw new Error('No ID token received from Google');
    }

    return tokens;
  }
}

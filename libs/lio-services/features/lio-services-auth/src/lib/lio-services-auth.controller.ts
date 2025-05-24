import { AuthService } from '@boktor-apps/lio-services/data-access/lio-services-auth';
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class LioServicesAuthController {
  private frontendRedirectTarget: string;
  constructor(private configService: ConfigService, private authService: AuthService) {
    this.frontendRedirectTarget = this.configService.get<string>('NX_PUBLIC_LIO_FRONTEND_BASE_URL');
  }
  @Get('login')
  getAuth() {
    const test_env = this.configService.get<{ frontendUrl: string }>('app', { infer: true });
    const test_env_2 = this.configService.get<string>('NX_PUBLIC_LIO_FRONTEND_BASE_URL');
    return { message: `You're authed! And: ${test_env?.frontendUrl} or ${test_env_2}` };
  }
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() request: { email: string; password: string }) {
    console.log('REQUEST =>', request);
    return await this.authService.signIn({ ...request });
  }

  @Post('signUp')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() request: { email: string; password: string; user_name: string }) {
    console.log('REQUEST for signUp =>', request);
    return await this.authService.signUp({ ...request });
  }

  @Get('google')
  async googleSignIn(@Res() res: Response) {
    const googleAuthUrl = await this.authService.getGoogleAuthUrl();
    return res.redirect(googleAuthUrl);
  }

  @Get('google/callback')
  async handleGoogleAuthCallback(@Query() code: string, @Req() req: Request, @Res() res: Response) {
    if (!code || (code && code.length === 0)) {
      throw new Error('Code is invalid or not defined');
    }

    const credentials = await this.authService.handleGoogleCallback(code);

    res.cookie('access_token', credentials.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.cookie('refresh_token', credentials.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    // Redirect to frontend after successful auth
    return res.redirect(this.frontendRedirectTarget || '/');
  }
}

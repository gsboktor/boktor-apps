import { AuthService, CognitoService, GoogleService } from '@boktor-apps/lio-services/data-access/lio-services-auth';
import { Module } from '@nestjs/common';
import { LioServicesAuthController } from './lio-services-auth.controller';

@Module({
  controllers: [LioServicesAuthController],
  providers: [AuthService, CognitoService, GoogleService],
})
export class LioServicesAuthModule {}

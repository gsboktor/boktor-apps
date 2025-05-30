import { LioServicesAuthModule } from '@boktor-apps/lio-services/features/lio-services-auth';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import configuration from '../configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const errorMessage = (env: string, key: string) => `[${env}:${key}]: A valid value needs to be configured.`;

const configSchema = z.object({
  NX_PUBLIC_GOOGLE_REDIRECT_URI: z.string().url(errorMessage(process.env.NODE_ENV, 'NX_PUBLIC_GOOGLE_REDIRECT_URI')),
  NX_PUBLIC_LIO_FRONTEND_BASE_URL: z.string().url(errorMessage(process.env.NODE_ENV, 'NX_PUBLIC_LIO_FRONTEND_BASE_URL')),
  NX_PUBLIC_COGNITO_CLIENT_ID: z.string().nonempty(errorMessage(process.env.NODE_ENV, 'NX_PUBLIC_COGNITO_CLIENT_ID')),
  NX_PUBLIC_COGNITO_USER_POOL_ID: z.string().nonempty(errorMessage(process.env.NODE_ENV, 'NX_PUBLIC_COGNITO_USER_POOL_ID')),
  NX_PUBLIC_GOOGLE_CLIENT_ID: z.string().nonempty(errorMessage(process.env.NODE_ENV, 'NX_PUBLIC_GOOGLE_CLIENT_ID')),
  NX_PUBLIC_GOOGLE_CLIENT_SECRET: z.string().nonempty(errorMessage(process.env.NODE_ENV, 'NX_PUBLIC_GOOGLE_CLIENT_SECRET')),
});

@Module({
  imports: [
    LioServicesAuthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validate: (config) => {
        console.log('CONFIG NOW', config);
        const result = configSchema.safeParse(config);
        if (!result.success) {
          const errors = result.error.errors.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
          }));
          throw new Error(`Configuration validation failed: ${JSON.stringify(errors, null, 2)}`);
        }
        return result.data;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

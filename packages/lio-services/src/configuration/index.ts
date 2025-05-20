export default () => ({
  port: 4203,
  baseUrl: process.env.NX_PUBLIC_LIO_SERVICES_BASE_URL,
  google: {
    clientSecret: process.env.NX_PUBLIC_GOOGLE_CLIENT_SECRET,
    clientId: process.env.NX_PUBLIC_GOOGLE_CLIENT_ID,
    redirectUri: process.env.NX_PUBLIC_GOOGLE_REDIRECT_URI,
  },
  aws: {
    region: process.env.NX_PUBLIC_AWS_REGION,
    cognito: {
      userPoolId: process.env.NX_PUBLIC_COGNITO_USER_POOL_ID,
      clientId: process.env.NX_PUBLIC_COGNITO_CLIENT_ID,
    },
  },
  app: {
    frontendUrl: process.env.NX_PUBLIC_LIO_FRONTEND_BASE_URL,
  },
});

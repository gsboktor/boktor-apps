import { GoogleLoginHandler, LoginHandler, SignUpHandler, VerifyUserHandler } from './functions';

export interface AuthServiceInterface {
  login: (loginProps: unknown) => Promise<unknown>;
  signUp: (signUpProps: number) => Promise<unknown>;
  verifyUser: (verifyUserProps: unknown) => Promise<unknown>;
  googleLogin: (googleLoginProps: unknown) => Promise<unknown>;
}

export const AuthService: AuthServiceInterface = {
  login: LoginHandler,
  signUp: SignUpHandler,
  verifyUser: VerifyUserHandler,
  googleLogin: GoogleLoginHandler,
};

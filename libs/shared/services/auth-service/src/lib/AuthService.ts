import { AuthClient } from './CognitoAuthClient';

export type SignUpPayload = {
  username: string;
  password: string;
  email: string;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type SignOutPayload = {
  token: string;
};

export type VerifyPayload = {
  username: string;
  code: string;
};

export type HttpClientOptions<T> = {
  status: number;
  error?: Error;
  data?: T;
};

export abstract class AuthService {
  constructor(private readonly authClient: AuthClient) {}
  public abstract signUp<T>(payload: SignUpPayload): Promise<HttpClientOptions<T>>;
  public abstract signIn<T>(payload: SignInPayload): Promise<HttpClientOptions<T>>;
  public abstract signOut<T>(payload: SignOutPayload): Promise<HttpClientOptions<T>>;
  public abstract verifySignUp<T>(payload: VerifyPayload): Promise<HttpClientOptions<T>>;
}

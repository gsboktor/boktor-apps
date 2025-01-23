import { Account } from '../bank-attempt-2/types/Types';

export abstract class Bank {
  public abstract createAccount: (payload: Omit<Account, 'id' | 'created_at'>) => string;
  public abstract getAccountDetails: (accId: string) => Account;
  public abstract deposit: (accId: string, amount: number) => boolean;
  public abstract withdraw: (accId: string, amount: number) => boolean;
  public abstract transfer: (fromAccId: string, toAccId: string, amount: number) => boolean;
}

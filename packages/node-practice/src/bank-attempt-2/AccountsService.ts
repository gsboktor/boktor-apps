// import { Account, Result, Transaction } from './types/Types';
// import { createInMemoryStore } from './utils';

// const accountStore = createInMemoryStore<string, Account>();

// export interface IAccountService {
//   createAccount: (payload: Omit<Account, 'id'>) => Promise<Result<{ id: string }, Error>>;
//   getAccountDetails: (id: string) => Promise<Result<Account, Error>>;
//   deposit: (account_id: string, amount: number) => Promise<Result<{}, Error>>;
//   withdrawal: (account_id: string, amount: number) => Promise<Result<{}, Error>>;
//   transfer: (origin_account_id: string, receiving_account_id: string) => Promise<Result<{}, Error>>;
//   getAccountHistory: (account_id: string, count?: number) => Promise<Result<Transaction[], Error>>;
// }

// class AccountService implements IAccountService {
//   constructor(private readonly _accountStore: Map<string, Account>) {}

//   public createAccount = (payload: Omit<Account, 'id'>) => {
//     return new Promise<Result<{ id: string }, Error>>((res) => {
//       let accountId = crypto.randomUUID();

//       this._accountStore.set(accountId, { id: accountId, ...payload });
//       res({ status: '200', data: { id: accountId } });
//     });
//   };

//   public getAccountDetails = (id: string) => {
//     return new Promise<Result<Account, Error>>((res, rej) => {
//       if (this._accountStore.has(id)) res({ status: '200', data: this._accountStore.get(id) });
//       rej('No account found');
//     });
//   };

//   public deposit = (account_id: string, amount: number) => {
//     return new Promise<Result<{}, Error>>(async (res) => {
//       let account_details = await this.getAccountDetails(account_id);
//       let account_data = account_details.data;
//       this._accountStore.set(account_id, { ...account_data, balance: account_data.balance + amount });
//     });
//   };
// }

// We're designing a class-based Banking Transaction System
// We need to support creating a user and persisting our users in some storage solution
// We need to support users creating multiple accounts, each account having its own transaction history
// We need to support basic operations like depositing and withdrawing money from accounts
// We need to support transfer between accounts.

type User = {
  id: string;
  user_name: string;
  password_hash: string;
  email: string;
  phoneNumber: string;
  accounts: string[];
};

type Account = {
  account_id: string;
  account_type: 'Checking' | 'Savings' | 'MM' | 'HYSA';
  balance: number;
  owner_id: string;
};

type Transaction = {
  transactionType: 'Transfer' | 'Withdrawal' | 'Deposit';
  amount: number;
  status: 'Pending' | 'Posted' | 'Declined';
  createdDate: string;
  postedDate?: string;
};

// interface TransactionService {
//     recordTransaction: (transactionType: 'Transfer' | 'Withdrawal' | 'Deposit', accountId: string, amount: number) => Promise<string>;
//     updateTransaction: (transactionId: string, status: 'Pending' | 'Posted' | 'Declined') => Promise<boolean>;
// }

// interface UserService {
//     getUser: (id: string) => User;
//     createUser: (user_name: string, password: string) => string;
//     createNewAccount: () => Promise<boolean>;
// }

// interface AccountService {
//     getAccount: (accountId: string) => Account;
//     getAccountBalance: (accountId: string) => string;
//     deposit: (amount: number, accountId: string) => Promise<boolean>;
//     withdrawal: (amount: number, accountId: string) => Promise<boolean>;
//     transfer: (amount: number, originAccountId: string, receivingAccountId: string) => Promise<boolean>;
//     getHistory: (accountId: string, count: number) => Promise<Transaction>
// }

abstract class RecordStore<T> {
  public abstract addRecord: (key: string, value: T) => void;
  public abstract hasRecord: (key: string) => boolean;
  public abstract getRecord: (key: string) => T | undefined;
  public abstract updateRecord: (key: string, newValue: Partial<T>) => void;
  public abstract deleteRecord: (key: string) => void;
  public abstract getAllEntries: () => Map<string, T>;
}

class UserStore implements RecordStore<User> {
  private _userStore = new Map<string, User>();

  public addRecord = (key: string, value: User) => {
    this._userStore.set(key, value);
  };

  public hasRecord = (key: string) => {
    return this._userStore.has(key);
  };

  public getRecord = (key: string) => {
    if (!this._userStore.has(key)) throw new Error('Whoops!');
    return this._userStore.get(key);
  };

  public updateRecord = (key: string, newValue: Partial<User>) => {
    if (!this._userStore.has(key)) throw new Error('Whoops!');

    const prevRecord = this._userStore.get(key)!;
    this._userStore.set(key, { ...prevRecord, ...newValue });
  };

  public deleteRecord = (key: string) => {
    this._userStore.delete(key);
  };

  public getAllEntries = () => {
    return this._userStore;
  };
}

class AccountStore implements RecordStore<Account> {
  private _accStore = new Map<string, Account>();

  public addRecord = (key: string, value: Account) => {
    this._accStore.set(key, value);
  };

  public hasRecord = (key: string) => {
    return this._accStore.has(key);
  };

  public getRecord = (key: string) => {
    if (!this._accStore.has(key)) throw new Error('Whoops!');
    return this._accStore.get(key);
  };

  public updateRecord = (key: string, newValue: Partial<Account>) => {
    if (!this._accStore.has(key)) throw new Error('Whoops!');

    const prevRecord = this._accStore.get(key)!;
    this._accStore.set(key, { ...prevRecord, ...newValue });
  };

  public deleteRecord = (key: string) => {
    this._accStore.delete(key);
  };

  public getAllEntries = () => {
    return this._accStore;
  };
}

const accountStoreSingleton = new AccountStore();
const userStoreSingleton = new UserStore();

interface BankClient {
  createNewUser: (userName: string, password: string, email: string, phoneNumber: string) => Promise<User>;
  createNewAccount: (userId: string, accType: 'Checking' | 'Savings', initialDeposit: number) => Promise<string>;
  login: (userName: string, password: string) => Promise<User>;
  getAllAccounts: (userId: string) => Promise<string[]>;
  getAccountDetails: (accountId: string) => Promise<Account>;
  deposit: (accountId: string, amount: number) => Promise<boolean>;
  withdrawal: (accountId: string, amount: number) => Promise<boolean>;
  transfer: (originAccountId: string, targetAccountId: string, amount: number) => Promise<boolean>;
  getHistory: (accountId: string, count: number) => Promise<Transaction[]>;
  viewStorage: () => void;
}

class Bank implements BankClient {
  constructor(private readonly userStore: UserStore, private readonly accountStore: AccountStore) {}

  public createNewUser = (userName: string, password: string, email: string, phoneNumber: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      const newUserId = btoa(`${userName},${password}`);

      if (this.userStore.hasRecord(newUserId)) reject('Error! User exists');

      const newUser: User = {
        id: newUserId,
        email: email,
        phoneNumber: phoneNumber,
        user_name: userName,
        password_hash: btoa(password),
        accounts: [],
      };
      this.userStore.addRecord(newUserId, newUser);

      resolve(newUser);
    });
  };

  public login = (userName: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
      const credentials = btoa(`${userName},${password}`);
      if (this.userStore.hasRecord(credentials)) {
        resolve(this.userStore.getRecord(credentials)!);
      } else {
        reject('Incorrect credentials!');
      }
    });
  };

  public createNewAccount = (userId: string, accType: 'Checking' | 'Savings', initialDeposit: number = 0) => {
    return new Promise<string>((resolve, reject) => {
      if (!this.userStore.hasRecord(userId)) reject('Error! UserId is invalid!');

      const newAccId = String(Math.random() * 10 ** 8);

      const newAcc: Account = {
        account_id: newAccId,
        account_type: accType,
        balance: initialDeposit,
        owner_id: userId,
      };

      this.accountStore.addRecord(newAccId, newAcc);

      const user = this.userStore.getRecord(userId)!;
      this.userStore.updateRecord(userId, {
        accounts: [...user.accounts, String(newAccId)],
      });

      resolve(newAccId);
    });
  };

  public getAllAccounts = (userId: string) => {
    return new Promise<string[]>((res, rej) => {
      if (!this.userStore.hasRecord(userId)) rej('UserId not found!');

      const accounts = this.userStore.getRecord(userId)?.accounts;
      res(accounts ?? []);
    });
  };

  public getAccountDetails = (accountId: string) => {
    return new Promise<Account>((res, rej) => {
      if (!this.accountStore.hasRecord(accountId)) rej('Error! No account');

      res(this.accountStore.getRecord(accountId)!);
    });
  };

  public deposit = (accountId: string, amount: number) => {
    return new Promise<boolean>((res, rej) => {
      if (!this.accountStore.hasRecord(accountId)) rej('Error! No Account');

      const currBalance = this.accountStore.getRecord(accountId)!.balance;
      this.accountStore.updateRecord(accountId, {
        balance: currBalance + amount,
      });
      res(true);
    });
  };

  public withdrawal = (accountId: string, amount: number) => {
    return new Promise<boolean>((res, rej) => {
      if (!this.accountStore.hasRecord(accountId)) rej('Error! No Account');

      const currBalance = this.accountStore.getRecord(accountId)!.balance;
      if (currBalance - amount < 0) {
        rej('Overdraft! Not enough funds');
        return null;
      }

      this.accountStore.updateRecord(accountId, {
        balance: currBalance - amount,
      });
      res(true);
    });
  };

  public transfer = (originAccountId: string, targetAccountId: string, amount: number) => {
    return new Promise<boolean>((res, rej) => {
      if (!this.accountStore.hasRecord(originAccountId)) rej("Error! Origin account doesn't exist");
      if (!this.accountStore.hasRecord(targetAccountId)) rej("Error! Target account doesn't exist");

      const originBalance = this.accountStore.getRecord(originAccountId)!.balance;
      if (originBalance - amount < 0) rej('Overdraft! Not enough funds');

      const receivingBalance = this.accountStore.getRecord(targetAccountId)!.balance;

      this.accountStore.updateRecord(originAccountId, {
        balance: originBalance - amount,
      });
      this.accountStore.updateRecord(targetAccountId, {
        balance: receivingBalance + amount,
      });
      res(true);
    });
  };

  public getHistory = (accountId: string, count: number) => {
    return new Promise<Transaction[]>((res, rej) => {
      res([] as Transaction[]);
    });
  };

  public viewStorage = () => {
    console.log('CURRENT USER STORE', this.userStore.getAllEntries());
    console.log('CURRENT ACCOUNT STORE', this.accountStore.getAllEntries());
  };
}

export const BankClient = new Bank(userStoreSingleton, accountStoreSingleton);

// import { Result, Transaction } from './types/Types';

import { Account, Transaction } from './types/Types';

// export interface BankInterface {
//   createAccount: (
//     type: 'Checking' | 'Savings',
//     initialDeposit: number,
//   ) => Promise<Result<{ accountId: string }, Error>>;
//   deposit: (accountId: string, amount: number) => Promise<Result<{ transactionId: string }, Error>>;
//   withdrawal: (accountId: string, amount: number) => Promise<Result<{ transactionId: string }, Error>>;
//   transfer: (
//     originAccountId: string,
//     receivingAccountId: string,
//     amount: number,
//   ) => Promise<Result<{ transactionId: string }, Error>>;
//   getTransactionHistory: (accountId: string, count: number) => Result<Transaction[], Error>;
// }

export class TransactionHeap {
  constructor(private readonly heap: Transaction[] = []) {}

  public bubbleUp = () => {
    if (this.heap.length > 1) {
      let currIdx = this.heap.length - 1;
      let parentIdx = Math.floor(currIdx / 2);

      while (this.heap[currIdx].amount > this.heap[parentIdx].amount && parentIdx >= 1) {
        let temp = this.heap[parentIdx];
        this.heap[parentIdx] = this.heap[currIdx];
        this.heap[currIdx] = temp;
        currIdx = parentIdx;
        parentIdx = Math.floor(currIdx / 2);
      }
    }
  };

  public bubbleDown = (idx: number) => {
    // 100 250 75 80 130 170
    let largest_idx = idx;
    let left = 2 * largest_idx + 1;
    let right = 2 * largest_idx + 2;

    if (this.heap[left] && this.heap[left].amount > this.heap[largest_idx].amount) {
      largest_idx = left;
    }

    if (this.heap[right] && this.heap[right].amount > this.heap[largest_idx].amount) {
      largest_idx = right;
    }

    if (largest_idx !== idx) {
      [this.heap[largest_idx], this.heap[idx]] = [this.heap[idx], this.heap[largest_idx]];

      this.bubbleDown(largest_idx);
    }
  };

  public insert(payload: Transaction) {
    this.heap.push(payload);
    this.bubbleUp();
    console.log('HEAP ARRAY', this.heap);
  }

  public getTop = () => {
    let topValue = this.heap.shift();
    this.bubbleDown(0);

    return topValue;
  };
}

export class Bank {
  private accountStore = new Map<string, Account>();
  private transactionStore = new Map<string, Transaction>();
  private transactionHistory = new TransactionHeap();

  private accountHistoryStore = new Map<string, Transaction[]>();

  private recordTransaction = (payload: Omit<Transaction, 'id'>) => {
    let transactionId = crypto.randomUUID();
    this.transactionStore.set(transactionId, { id: transactionId, ...payload });
    this.transactionHistory.insert({ id: transactionId, ...payload });
  };

  public deposit = (accountId: string, amount: number): boolean => {
    let acc = this.accountStore.get(accountId);

    if (!acc) return false;

    this.accountStore.set(accountId, { ...acc, balance: acc.balance + amount });

    this.recordTransaction({
      type: 'Deposit',
      amount: amount,
      status: 'Posted',
      origin_account_id: accountId,
      created_date: Date.now(),
    });

    return true;
  };

  public withdraw = (accountId: string, amount: number): boolean => {
    let acc = this.accountStore.get(accountId);

    if (!acc || acc.balance - amount < 0) return false;

    this.accountStore.set(accountId, { ...acc, balance: acc.balance - amount });
    this.recordTransaction({
      type: 'Withdrawal',
      amount: amount,
      status: 'Posted',
      origin_account_id: accountId,
      created_date: Date.now(),
    });

    return true;
  };

  public transfer = (originAccountId: string, receivingAccountId: string, amount: number) => {
    let acc1 = this.accountStore.get(originAccountId);
    let acc2 = this.accountStore.get(receivingAccountId);

    if (!acc1 || !acc2 || acc1.balance - amount < 0) return false;

    this.accountStore.set(originAccountId, { ...acc1, balance: acc1.balance - amount });
    this.accountStore.set(receivingAccountId, { ...acc2, balance: acc2.balance + amount });

    this.recordTransaction({
      type: 'Transfer',
      amount: amount,
      status: 'Posted',
      origin_account_id: originAccountId,
      receiving_account_id: receivingAccountId,
      created_date: Date.now(),
    });
  };

  public createAccount = (payload: Omit<Account, 'id'>) => {
    let accId = crypto.randomUUID();
    this.accountStore.set(accId, { id: accId, ...payload });

    return accId;
  };

  public getAccountDetails = (id: string) => {
    if (!this.accountStore.has(id)) throw new Error('No account!');
    return this.accountStore.get(id);
  };

  public getAllTransactions = () => {
    return this.transactionHistory;
  };

  public getTopKTransactions = (count: number) => {
    let transactions = [] as Transaction[];
    for (let i = 0; i < count; i += 1) {
      transactions.push(this.transactionHistory.getTop());
    }

    return transactions;
  };
}

export const MyBank = new Bank();

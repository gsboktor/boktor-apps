import { Account, Transaction } from '../bank-attempt-2/types/Types';
import { Bank } from './AbstractBankClass';
import { accountHistoryStore, accountsStore, transactionStore } from './createGenericStore';

export interface ITransactionHeap {
  insert: (t: Transaction) => void;
  getTop: () => Transaction;
  bubbleUp: () => void;
  bubbleDown: (start: number) => void;
}

export class TransactionHeap implements ITransactionHeap {
  constructor(private readonly heap: Transaction[] = []) {}

  public insert = (trans: Transaction) => {
    this.heap.push(trans);
    this.bubbleUp();
  };

  public getTop = () => {
    let top = this.heap.shift();
    this.bubbleDown(0);
    console.log('AFTER BUBBLE DOWN', this.heap);
    return top;
  };

  public bubbleUp = () => {
    let latestIdx = this.heap.length - 1;
    let parentIdx = Math.floor(latestIdx / 2);

    while (parentIdx >= 0) {
      if (!(this.heap[latestIdx].amount > this.heap[parentIdx].amount)) {
        break;
      }

      [this.heap[latestIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[latestIdx]];
      latestIdx = parentIdx;
      parentIdx = Math.floor(latestIdx / 2);
    }

    console.log('HEAPY', this.heap);
  };
  public bubbleDown = (startIdx: number) => {
    let topIdx = startIdx;
    let leftIdx = 2 * topIdx + 1;
    let rightIdx = 2 * topIdx + 2;
    let largest = topIdx;

    if (this.heap[leftIdx] && this.heap[topIdx].amount < this.heap[leftIdx].amount) {
      largest = leftIdx;
    }

    if (this.heap[rightIdx] && this.heap[topIdx].amount < this.heap[rightIdx].amount) {
      largest = rightIdx;
    }

    if (largest !== topIdx) {
      [this.heap[topIdx], this.heap[largest]] = [this.heap[largest], this.heap[topIdx]];
      this.bubbleDown(largest);
    }
  };
}

export class FinalBank implements Bank {
  constructor(
    private readonly accountStore: Map<string, Account>,
    private readonly transactionsStore: Map<string, Transaction>,
    private readonly accountHistory: Map<string, ITransactionHeap>,
  ) {}

  private recordTransaction = (transaction: Omit<Transaction, 'id'>) => {
    let transId = crypto.randomUUID();
    let newTransaction = { id: transId, ...transaction };

    this.accountHistory.get(transaction.origin_account_id).insert(newTransaction);
    this.transactionsStore.set(transId, newTransaction);
  };

  public createAccount = (payload: Omit<Account, 'id' | 'created_at'>) => {
    let accId = crypto.randomUUID();
    let created_stamp = Date.now();
    this.accountHistory.set(accId, new TransactionHeap());

    if (payload.balance) {
      this.recordTransaction({
        type: 'Deposit',
        created_date: created_stamp,
        amount: payload.balance,
        status: 'Posted',
        origin_account_id: accId,
      });
    }

    this.accountStore.set(accId, { id: accId, created_at: created_stamp, ...payload });
    return accId;
  };

  public getAccountDetails = (accId: string) => {
    return this.accountStore.get(accId);
  };

  public deposit = (accId: string, amount: number) => {
    let currAcc = this.accountStore.get(accId);
    this.accountStore.set(accId, { ...currAcc, balance: currAcc.balance + amount });

    let timestamp = Date.now();

    this.recordTransaction({
      type: 'Deposit',
      amount: amount,
      origin_account_id: accId,
      created_date: timestamp,
      status: 'Posted',
    });

    return true;
  };

  public withdraw = (accId: string, amount: number) => {
    let currAcc = this.accountStore.get(accId);
    if (currAcc.balance - amount < 0) return false;

    this.accountStore.set(accId, { ...currAcc, balance: currAcc.balance - amount });

    let timestamp = Date.now();

    this.recordTransaction({
      type: 'Withdrawal',
      amount: amount,
      origin_account_id: accId,
      created_date: timestamp,
      status: 'Posted',
    });

    return true;
  };

  public transfer = (fromAccId: string, toAccId: string, amount: number) => {
    let fromAcc = this.accountStore.get(fromAccId);
    let toAcc = this.accountStore.get(toAccId);

    if (fromAcc.balance - amount < 0) return false;

    this.accountStore.set(fromAccId, { ...fromAcc, balance: fromAcc.balance - amount });
    this.accountStore.set(toAccId, { ...toAcc, balance: toAcc.balance + amount });

    let timestamp = Date.now();

    this.recordTransaction({
      type: 'Transfer',
      amount: amount,
      origin_account_id: fromAccId,
      receiving_account_id: toAccId,
      created_date: timestamp,
      status: 'Posted',
    });

    return true;
  };

  public getAllTransactions = () => {
    return this.transactionsStore;
  };

  public getTopTransactionsByAccount = (accId: string, count: number) => {
    const trans = [];
    for (let r = 0; r < count; r += 1) {
      trans.push(this.accountHistory.get(accId).getTop());
    }
    return trans;
  };
}

export const finalMyBank = new FinalBank(accountsStore, transactionStore, accountHistoryStore);

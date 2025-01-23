import { Account, Transaction } from '../bank-attempt-2/types/Types';
import { ITransactionHeap } from './FinalBank';

export const createGenericStore = <T extends Record<string, unknown> | object | unknown>() => {
  return new Map<string, T>();
};

export const transactionStore = createGenericStore<Transaction>();
export const accountsStore = createGenericStore<Account>();
export const accountHistoryStore = createGenericStore<ITransactionHeap>();

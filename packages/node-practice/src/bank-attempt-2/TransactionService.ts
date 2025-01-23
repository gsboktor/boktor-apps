import { Result, Transaction } from './types/Types';
import { createInMemoryStore } from './utils';

interface ITransactionService {
  createTransaction: (payload: Transaction) => Promise<Result<{ id: string }, Error>>;
}

const transactionStore = createInMemoryStore<string, Transaction>();

class TransactionService implements ITransactionService {
  constructor(private readonly _transactionStore: Map<string, Transaction>) {}

  public createTransaction = (payload: Transaction) => {
    return new Promise<Result<{ id: string }, Error>>((resolve) => {
      let newTransactionId = crypto.randomUUID();
      this._transactionStore.set(newTransactionId, payload);

      resolve({
        status: '200',
        data: {
          id: newTransactionId,
        },
      });
    });
  };
}

export const transactionService = new TransactionService(transactionStore);

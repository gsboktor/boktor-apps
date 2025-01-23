import { Bank, TransactionHeap } from './bank-attempt-2/Bank';
import { Account } from './bank-attempt-2/types/Types';

describe('Bank test', () => {
  let myBank: Bank;
  let mapSet: jest.SpyInstance;
  let transactionSpy: jest.SpyInstance;
  let accPayload: Omit<Account, 'id'>;

  beforeEach(() => {
    myBank = new Bank();
    mapSet = jest.spyOn(Map.prototype, 'set');
    transactionSpy = jest.spyOn(TransactionHeap.prototype, 'insert');
    accPayload = {
      type: 'Checking',
      balance: 100,
      created_at: Date.now(),
    };
  });

  test('Create accounts', () => {
    const acc1 = myBank.createAccount(accPayload);

    expect(acc1).toBeDefined();
    expect(mapSet).toHaveBeenCalledWith(acc1, expect.objectContaining({ type: accPayload.type } as Account));
  });

  test('Account deposit', () => {
    let acc1 = myBank.createAccount(accPayload);

    myBank.deposit(acc1, 20000);
    let details = myBank.getAccountDetails(acc1);

    expect(details).toEqual(expect.objectContaining({ id: acc1 }));
    expect(transactionSpy).toHaveBeenCalledWith(expect.objectContaining({ origin_account_id: acc1 }));
    expect(details).toEqual(expect.objectContaining({ balance: 20100 } as Partial<Account>));
  });
});

export type Account = {
  id: string;
  type: 'Checking' | 'Savings';
  balance: number;
  created_at: number;
};

export type Transaction = {
  id: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer';
  status: 'Pending' | 'Posted';
  amount: number;
  origin_account_id: string;
  receiving_account_id?: string;
  created_date: number;
};

export type Result<T, K extends Error> =
  | {
      status: '200' | '400' | '500';
      data: T;
      error?: null;
    }
  | {
      status: '200' | '400' | '500';
      data?: null;
      error: K;
    };

import { finalMyBank } from './final-bank/FinalBank';

export const testBankClient = async () => {
  let acc1 = finalMyBank.createAccount({ type: 'Savings', balance: 4000 });
  console.log(finalMyBank.getAccountDetails(acc1));
  console.log(finalMyBank.deposit(acc1, 223));
  console.log(finalMyBank.deposit(acc1, 224));
  console.log(finalMyBank.deposit(acc1, 20230));

  console.log(finalMyBank.getAllTransactions());
  console.log('TOP 2', finalMyBank.getTopTransactionsByAccount(acc1, 2));

  // const fs = new FileSystem();

  // console.log(fs.ls('/'));
  // fs.mkDir('/a/b/f/g');
  // console.log(fs.ls('/a/b'));
  // fs.addContentFile('/r/s', 'this is s file');
  // fs.addContentFile('/r/s', 'concated');
  // console.log(fs.ls('/r/s'));
  // fs.mkDir('/r/n');
  // fs.addContentFile('/r/n/e', 'poo');
  // fs.mkDir('r/u');
  // fs.mkDir('r/n/new');
  // fs.addContentFile('/r/n/new/new2/new3/file4', 'poo');

  // fs.print();
};

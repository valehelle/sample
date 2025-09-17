export type AccountData = {
  currentAccount: {
    name: string;
    balance: number;
    accountNumber: string;
  };
  transactions: {
    id: number;
    description: string;
    date: string;
    amount: number;
  }[];
  creditCards: {
    id: number;
    type: string;
    last4: string;
    outstandingBalance: number;
  }[];
};

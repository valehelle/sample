export interface AccountData {
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
}

export interface CreateTransactionResponse {
  success: boolean;
  transaction: {
    amount: number;
    accountNumber: string;
    optionalNotes: string;
  };
}

export interface CreateTransactionBody {
  amount: number;
  accountNumber: string;
  optionalNotes: string;
}

// WALLET BALANCE
export interface WalletBalanceResponse {
  userId: string;
  wulfCash: number; // decimal
  wulfCoin: number; // integer
}

// WALLET TRANSACTION
export interface WalletTransaction {
  id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  currency: "wulfCash" | "wulfCoin";
  description: string;
  createdAt: string;
}

export interface WalletTransactionResponse {
  transactions: WalletTransaction[];
  total: number;
  page: number;
  limit: number;
}

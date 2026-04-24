// TRANSACTION TYPES
export type TransactionType = "DEPOSIT" | "WITHDRAW" | "SWAP" | "BONUS" | "BILL";
export type TransactionSource = "BUNDLE_PURCHASE" | "GAME" | "AFFILIATE" | "VAULT";

// TRANSACTION MODEL
export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  source: TransactionSource;
  referenceId: string;
  description: string;
  createdAt: string;

  wulfCoinAdded: string;
  wulfCashAdded: string;

  wulfCoinBalanceBefore: string;
  wulfCashBalanceBefore: string;
  wulfCoinBalanceAfter: string;
  wulfCashBalanceAfter: string;
}

// TRANSACTION RESPONSE
export interface TransactionResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}

// FILTER OPTIONS
export interface TransactionFilters {
  type?: TransactionType | "All";
  source?: TransactionSource | "All";
  fromDate?: string;
  toDate?: string;
  page?: number;
  limit?: number;
}

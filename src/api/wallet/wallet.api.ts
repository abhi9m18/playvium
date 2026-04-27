import type {
  WalletBalanceResponse,
  WalletTransactionResponse,
} from "./wallet.types";
import {
  getWalletBalanceData,
  getWalletTransactionsData,
} from "@/lib/mock-site-data";

// GET WALLET BALANCE - DUMMY
export const getWalletBalance = async (): Promise<WalletBalanceResponse> => {
  return getWalletBalanceData();
};

// GET WALLET TRANSACTIONS - DUMMY
export const getWalletTransactions = async (
  page: number = 1,
  limit: number = 10
): Promise<WalletTransactionResponse> => {
  return getWalletTransactionsData(page, limit);
};

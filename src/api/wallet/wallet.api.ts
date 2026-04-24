import api from "../config/axios.config";
import type {
  WalletBalanceResponse,
  WalletTransactionResponse,
} from "./wallet.types";

// GET WALLET BALANCE
export const getWalletBalance = async (): Promise<WalletBalanceResponse> => {
  const res = await api.get<WalletBalanceResponse>("/wallet/balance");
  return res.data;
};

// GET WALLET TRANSACTIONS
export const getWalletTransactions = async (
  page: number = 1,
  limit: number = 10
): Promise<WalletTransactionResponse> => {
  const res = await api.get<WalletTransactionResponse>(
    `/wallet/transactions?page=${page}&limit=${limit}`
  );
  return res.data;
};

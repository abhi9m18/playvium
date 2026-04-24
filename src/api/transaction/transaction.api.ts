import type {
  TransactionResponse,
  TransactionFilters,
} from "./transaction.types";
import {
  getTransactionByIdData,
  getTransactionData,
} from "@/lib/mock-site-data";

// GET USER TRANSACTIONS - DUMMY
export const getUserTransactions = async (
  filters?: TransactionFilters
): Promise<TransactionResponse> => {
  return getTransactionData(filters);
};

// GET TRANSACTION BY ID - DUMMY
export const getTransactionById = async (id: string) => {
  return getTransactionByIdData(id);
};

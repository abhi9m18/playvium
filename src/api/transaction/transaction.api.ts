import api from "../config/axios.config";
import type {
  TransactionResponse,
  TransactionFilters,
} from "./transaction.types";

// GET USER TRANSACTIONS
export const getUserTransactions = async (
  filters?: TransactionFilters
): Promise<TransactionResponse> => {
  const params = new URLSearchParams();

  if (filters?.type && filters.type !== "All") {
    params.append("type", filters.type);
  }
  if (filters?.source && filters.source !== "All") {
    params.append("source", filters.source);
  }
  if (filters?.fromDate) {
    params.append("fromDate", filters.fromDate);
  }
  if (filters?.toDate) {
    params.append("toDate", filters.toDate);
  }
  if (filters?.page) {
    params.append("page", String(filters.page));
  }
  if (filters?.limit) {
    params.append("limit", String(filters.limit));
  }

  const queryString = params.toString();
  const url = queryString
    ? `/transactions/me?${queryString}`
    : "/transactions/me";

  const res = await api.get<TransactionResponse>(url);
  return res.data;
};

// GET TRANSACTION BY ID
export const getTransactionById = async (id: string) => {
  const res = await api.get(`/transactions/${id}`);
  return res.data;
};

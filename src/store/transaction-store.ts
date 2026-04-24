// src/store/transaction-store.ts
import { create } from "zustand";
import * as transactionApi from "@/api/transaction/transaction.api";
import type {
  Transaction,
  TransactionFilters,
} from "@/types/transaction.types";
import toast from "react-hot-toast";

interface TransactionState {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
  isLoading: boolean;
  error: string | null;
  filters: TransactionFilters;
}

interface TransactionActions {
  fetchTransactions: (filters?: TransactionFilters) => Promise<void>;
  setFilters: (filters: TransactionFilters) => void;
  clearTransactions: () => void;
}

export const useTransactionStore = create<
  TransactionState & TransactionActions
>((set, get) => ({
  // STATE
  transactions: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  error: null,
  filters: {},

  // FETCH TRANSACTIONS
  fetchTransactions: async (filters?: TransactionFilters) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = filters || get().filters;
      const data = await transactionApi.getUserTransactions(currentFilters);
      
      set({
        transactions: data.data || [],
        total: data.total,
        page: data.page,
        limit: data.limit,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch transactions";
      set({ error: errorMessage, isLoading: false, transactions: [] });
      toast.error(errorMessage);
    }
  },

  // SET FILTERS
  setFilters: (filters: TransactionFilters) => {
    set({ filters });
  },

  // CLEAR TRANSACTIONS
  clearTransactions: () => {
    set({
      transactions: [],
      total: 0,
      page: 1,
      limit: 10,
      isLoading: false,
      error: null,
      filters: {},
    });
  },
}));

// src/store/wallet-store.ts
import { create } from "zustand";
import * as walletApi from "@/api/wallet/wallet.api";
import type {
  WalletBalanceResponse,
  WalletTransaction,
} from "@/types/wallet.types";
import toast from "react-hot-toast";

interface WalletState {
  wallet: WalletBalanceResponse | null;
  transactions: WalletTransaction[];
  isLoading: boolean;
  error: string | null;
}

interface WalletActions {
  fetchWalletBalance: () => Promise<void>;
  fetchTransactions: (page?: number, limit?: number) => Promise<void>;
  clearWallet: () => void;
}

export const useWalletStore = create<WalletState & WalletActions>((set, get) => ({
  // STATE
  wallet: null,
  transactions: [],
  isLoading: false,
  error: null,

  // FETCH WALLET BALANCE
  fetchWalletBalance: async () => {
    // Only show loading on initial fetch (when wallet is null)
    const hasWallet = get().wallet !== null;
    set({ isLoading: !hasWallet, error: null });
    try {
      const data = await walletApi.getWalletBalance();
      set({ wallet: data, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch wallet balance";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  // FETCH WALLET TRANSACTIONS
  fetchTransactions: async (page = 1, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const data = await walletApi.getWalletTransactions(page, limit);
      set({ transactions: data.transactions, isLoading: false });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch transactions";
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  // CLEAR WALLET
  clearWallet: () => {
    set({
      wallet: null,
      transactions: [],
      isLoading: false,
      error: null,
    });
  },
}));

import type {
  WalletBalanceResponse,
  WalletTransaction,
  WalletTransactionResponse,
} from "@/types/wallet.types";
import type {
  Transaction,
  TransactionFilters,
  TransactionResponse,
} from "@/types/transaction.types";

export type ActiveBundle = {
  id: string;
  name: string;
  description: string;
  wulfCoinAmount: number;
  bonusWulfCash: number;
  price: number;
  isActive: boolean;
  displayOrder: number;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
};

const WALLET_STORAGE_KEY = "mock-wallet-balance";
const TRANSACTION_STORAGE_KEY = "mock-wallet-transactions";

const now = "2026-01-01T00:00:00.000Z";

const defaultWallet: WalletBalanceResponse = {
  userId: "user_123456",
  wulfCash: 5250.75,
  wulfCoin: 1500,
};

const defaultBundles: ActiveBundle[] = [
  {
    id: "bundle_bronze",
    name: "Bronze Pack",
    description: "Starter pack for casual play",
    wulfCoinAmount: 5000,
    bonusWulfCash: 100.5,
    price: 9.99,
    isActive: true,
    displayOrder: 1,
    icon: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bundle_silver",
    name: "Silver Pack",
    description: "Most popular balance of value and bonus",
    wulfCoinAmount: 10000,
    bonusWulfCash: 250,
    price: 19.99,
    isActive: true,
    displayOrder: 2,
    icon: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bundle_gold",
    name: "Gold Pack",
    description: "Higher-value package for regular players",
    wulfCoinAmount: 25000,
    bonusWulfCash: 700,
    price: 49.99,
    isActive: true,
    displayOrder: 3,
    icon: null,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "bundle_vip",
    name: "VIP Pack",
    description: "Large package with the highest bonus",
    wulfCoinAmount: 50000,
    bonusWulfCash: 1500,
    price: 99.99,
    isActive: true,
    displayOrder: 4,
    icon: null,
    createdAt: now,
    updatedAt: now,
  },
];

const defaultTransactions: Transaction[] = [
  {
    id: "txn_001",
    userId: "user_123456",
    type: "DEPOSIT",
    source: "BUNDLE_PURCHASE",
    referenceId: "ref_001",
    description: "Purchased Bronze Bundle - 5000 coins",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    wulfCoinAdded: "5000",
    wulfCashAdded: "0",
    wulfCoinBalanceBefore: "2000",
    wulfCashBalanceBefore: "1500.50",
    wulfCoinBalanceAfter: "7000",
    wulfCashBalanceAfter: "1500.50",
  },
  {
    id: "txn_002",
    userId: "user_123456",
    type: "WITHDRAW",
    source: "GAME",
    referenceId: "ref_002",
    description: "Bet placed on Slots Game",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    wulfCoinAdded: "-500",
    wulfCashAdded: "0",
    wulfCoinBalanceBefore: "7000",
    wulfCashBalanceBefore: "1500.50",
    wulfCoinBalanceAfter: "6500",
    wulfCashBalanceAfter: "1500.50",
  },
  {
    id: "txn_003",
    userId: "user_123456",
    type: "BONUS",
    source: "AFFILIATE",
    referenceId: "ref_003",
    description: "Referral Bonus - Friend Signup",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    wulfCoinAdded: "250",
    wulfCashAdded: "0",
    wulfCoinBalanceBefore: "6500",
    wulfCashBalanceBefore: "1500.50",
    wulfCoinBalanceAfter: "6750",
    wulfCashBalanceAfter: "1500.50",
  },
  {
    id: "txn_004",
    userId: "user_123456",
    type: "SWAP",
    source: "VAULT",
    referenceId: "ref_004",
    description: "Converted 1000 Cash to Coins",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    wulfCoinAdded: "1200",
    wulfCashAdded: "-1000",
    wulfCoinBalanceBefore: "6750",
    wulfCashBalanceBefore: "1500.50",
    wulfCoinBalanceAfter: "7950",
    wulfCashBalanceAfter: "500.50",
  },
  {
    id: "txn_005",
    userId: "user_123456",
    type: "DEPOSIT",
    source: "BUNDLE_PURCHASE",
    referenceId: "ref_005",
    description: "Purchased Gold Bundle - 2000 coins",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    wulfCoinAdded: "2000",
    wulfCashAdded: "0",
    wulfCoinBalanceBefore: "7950",
    wulfCashBalanceBefore: "500.50",
    wulfCoinBalanceAfter: "9950",
    wulfCashBalanceAfter: "500.50",
  },
  {
    id: "txn_006",
    userId: "user_123456",
    type: "BILL",
    source: "GAME",
    referenceId: "ref_006",
    description: "Game Fee - Premium Match",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    wulfCoinAdded: "-100",
    wulfCashAdded: "-50.25",
    wulfCoinBalanceBefore: "9950",
    wulfCashBalanceBefore: "500.50",
    wulfCoinBalanceAfter: "9850",
    wulfCashBalanceAfter: "450.25",
  },
];

const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const canUseStorage = () => typeof window !== "undefined";

const readJson = <T>(key: string, fallback: T): T => {
  if (!canUseStorage()) return fallback;

  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (!canUseStorage()) return;
  localStorage.setItem(key, JSON.stringify(value));
};

const getStoredWallet = (): WalletBalanceResponse => {
  const wallet = readJson(WALLET_STORAGE_KEY, defaultWallet);
  if (!canUseStorage() || localStorage.getItem(WALLET_STORAGE_KEY)) {
    return wallet;
  }

  writeJson(WALLET_STORAGE_KEY, wallet);
  return wallet;
};

const getStoredTransactions = (): Transaction[] => {
  const transactions = readJson(TRANSACTION_STORAGE_KEY, defaultTransactions);
  if (!canUseStorage() || localStorage.getItem(TRANSACTION_STORAGE_KEY)) {
    return transactions;
  }

  writeJson(TRANSACTION_STORAGE_KEY, transactions);
  return transactions;
};

const saveWallet = (wallet: WalletBalanceResponse) => {
  writeJson(WALLET_STORAGE_KEY, wallet);
};

const saveTransactions = (transactions: Transaction[]) => {
  writeJson(TRANSACTION_STORAGE_KEY, transactions);
};

const filterTransactions = (
  transactions: Transaction[],
  filters?: TransactionFilters
) => {
  let filtered = [...transactions];

  if (filters?.type && filters.type !== "All") {
    filtered = filtered.filter((transaction) => transaction.type === filters.type);
  }

  if (filters?.source && filters.source !== "All") {
    filtered = filtered.filter(
      (transaction) => transaction.source === filters.source
    );
  }

  if (filters?.fromDate) {
    const fromTime = new Date(filters.fromDate).getTime();
    filtered = filtered.filter(
      (transaction) => new Date(transaction.createdAt).getTime() >= fromTime
    );
  }

  if (filters?.toDate) {
    const toTime = new Date(filters.toDate).getTime();
    filtered = filtered.filter(
      (transaction) => new Date(transaction.createdAt).getTime() <= toTime
    );
  }

  filtered.sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );

  return filtered;
};

const toWalletTransaction = (transaction: Transaction): WalletTransaction => {
  const coinDelta = Number(transaction.wulfCoinAdded || 0);
  const cashDelta = Number(transaction.wulfCashAdded || 0);
  const useCash = cashDelta !== 0 && Math.abs(cashDelta) >= Math.abs(coinDelta);
  const amount = useCash ? cashDelta : coinDelta;

  return {
    id: transaction.id,
    userId: transaction.userId,
    type: amount >= 0 ? "credit" : "debit",
    amount: Math.abs(amount),
    currency: useCash ? "wulfCash" : "wulfCoin",
    description: transaction.description,
    createdAt: transaction.createdAt,
  };
};

export const getActiveBundles = async (): Promise<ActiveBundle[]> => {
  await wait(250);
  return [...defaultBundles].sort(
    (left, right) => left.displayOrder - right.displayOrder
  );
};

export const getWalletBalanceData = async (): Promise<WalletBalanceResponse> => {
  await wait(200);
  return getStoredWallet();
};

export const getWalletTransactionsData = async (
  page = 1,
  limit = 10
): Promise<WalletTransactionResponse> => {
  await wait(250);

  const transactions = getStoredTransactions().map(toWalletTransaction);
  const startIndex = (page - 1) * limit;
  const paginatedTransactions = transactions.slice(startIndex, startIndex + limit);

  return {
    transactions: paginatedTransactions,
    total: transactions.length,
    page,
    limit,
  };
};

export const getTransactionData = async (
  filters?: TransactionFilters
): Promise<TransactionResponse> => {
  await wait(300);

  const filteredTransactions = filterTransactions(getStoredTransactions(), filters);
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const startIndex = (page - 1) * limit;
  const data = filteredTransactions.slice(startIndex, startIndex + limit);

  return {
    data,
    total: filteredTransactions.length,
    page,
    limit,
  };
};

export const getTransactionByIdData = async (id: string) => {
  await wait(200);

  const transaction = getStoredTransactions().find((item) => item.id === id);
  if (!transaction) {
    throw new Error("Transaction not found");
  }

  return transaction;
};

export const purchaseBundle = async (bundleId: string) => {
  await wait(400);

  const bundle = defaultBundles.find((item) => item.id === bundleId);
  if (!bundle) {
    throw new Error("Bundle not found");
  }

  const currentWallet = getStoredWallet();
  const updatedWallet: WalletBalanceResponse = {
    ...currentWallet,
    wulfCoin: currentWallet.wulfCoin + bundle.wulfCoinAmount,
    wulfCash: Number(
      (currentWallet.wulfCash + bundle.bonusWulfCash).toFixed(2)
    ),
  };

  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    userId: currentWallet.userId,
    type: "DEPOSIT",
    source: "BUNDLE_PURCHASE",
    referenceId: bundle.id,
    description: `Purchased ${bundle.name} - ${bundle.wulfCoinAmount.toLocaleString()} coins`,
    createdAt: new Date().toISOString(),
    wulfCoinAdded: String(bundle.wulfCoinAmount),
    wulfCashAdded: String(bundle.bonusWulfCash),
    wulfCoinBalanceBefore: String(currentWallet.wulfCoin),
    wulfCashBalanceBefore: currentWallet.wulfCash.toFixed(2),
    wulfCoinBalanceAfter: String(updatedWallet.wulfCoin),
    wulfCashBalanceAfter: updatedWallet.wulfCash.toFixed(2),
  };

  saveWallet(updatedWallet);
  saveTransactions([transaction, ...getStoredTransactions()]);

  return {
    message: "Payment successful",
    wallet: updatedWallet,
    transaction,
    bundle,
  };
};

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { gold_coin } from "@/assets/icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuthStore } from "@/store/auth-store";
import { useTransactionStore } from "@/store/transaction-store";
import type { TransactionType, TransactionSource } from "@/types/transaction.types";

type WalletHistoryProps = {
  header?: React.ReactNode;
};

/* ============================
   FILTER CONFIG
============================ */
const filterOptions = [
  {
    placeholder: "Transaction Type",
    defaultValue: "All" as const,
    options: ["All", "DEPOSIT", "WITHDRAW", "SWAP", "BONUS", "BILL"] as const,
  },
  {
    placeholder: "Source",
    defaultValue: "All" as const,
    options: ["All", "BUNDLE_PURCHASE", "GAME", "AFFILIATE", "VAULT"] as const,
  },
  {
    placeholder: "Past 24 hours",
    defaultValue: "Past 24 hours" as const,
    options: ["Past 24 hours", "Past 7 days", "Past 30 days", "Past 60 days", "Past 90 days"] as const,
  },
];

/* ============================
   HELPERS
============================ */
const formatDate = (iso: string) => {
  const d = new Date(iso);
  // Example output: 21/1/2026 1:18 PM
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const fmtNumber = (value: string | number) => {
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
};

const getTimeRangeQuery = (label: string) => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;

  let from = now - day;
  if (label === "Past 7 days") from = now - 7 * day;
  if (label === "Past 30 days") from = now - 30 * day;
  if (label === "Past 60 days") from = now - 60 * day;
  if (label === "Past 90 days") from = now - 90 * day;

  return { fromISO: new Date(from).toISOString(), toISO: new Date(now).toISOString() };
};

export default function WalletHistory({ header }: WalletHistoryProps) {
  const { token, isAuthenticated } = useAuthStore();
  const { transactions, isLoading, fetchTransactions, setFilters } = useTransactionStore();

  const [txType, setTxType] = useState<TransactionType | "All">("All");
  const [source, setSource] = useState<TransactionSource | "All">("All");
  const [range, setRange] = useState("Past 24 hours");

  useEffect(() => {
    if (token && isAuthenticated === "authenticated") {
      fetchTransactions();
    }
  }, [token, isAuthenticated, fetchTransactions]);

  useEffect(() => {
    const handleWalletRefresh = () => {
      if (token && isAuthenticated === "authenticated") {
        fetchTransactions();
      }
    };

    window.addEventListener("wallet-refresh", handleWalletRefresh);
    return () => window.removeEventListener("wallet-refresh", handleWalletRefresh);
  }, [token, isAuthenticated, fetchTransactions]);

  /* ============================
     CLIENT-SIDE FILTERING
  ============================ */
  const filtered = useMemo(() => {
    let list = [...transactions];

    if (txType !== "All") {
      list = list.filter((t) => t.type === txType);
    }
    if (source !== "All") {
      list = list.filter((t) => t.source === source);
    }

    const { fromISO } = getTimeRangeQuery(range);
    const fromTime = new Date(fromISO).getTime();
    list = list.filter((t) => new Date(t.createdAt).getTime() >= fromTime);

    // latest first
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return list;
  }, [transactions, txType, source, range]);

  /* ============================
     MAP TO TABLE ROWS
  ============================ */
  const rows = useMemo(() => {
    return filtered.map((t) => {
      const coinAdded = Number(t.wulfCoinAdded || "0");
      const cashAdded = Number(t.wulfCashAdded || "0");

      // Show amount (prefer coin if exists else cash)
      const amountText =
        coinAdded > 0
          ? fmtNumber(coinAdded)
          : cashAdded > 0
          ? fmtNumber(cashAdded)
          : "0";

      // Show balance (prefer coin after if coinAdded else cash after)
      const balanceText =
        coinAdded > 0
          ? fmtNumber(t.wulfCoinBalanceAfter)
          : cashAdded > 0
          ? fmtNumber(t.wulfCashBalanceAfter)
          : fmtNumber(t.wulfCoinBalanceAfter);

      return {
        id: t.id,
        type: t.type, // DEPOSIT
        time: formatDate(t.createdAt),
        amount: amountText,
        balance: balanceText,
      };
    });
  }, [filtered]);

  return (
    <div className="space-y-4">
      {header}

      <p className="hidden md:block text-white text-2xl font-bold">Transaction</p>

      {/* ============================
          FILTER DROPDOWNS
      ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {/* TYPE */}
        <Select value={txType} onValueChange={(value) => setTxType(value as TransactionType | "All")}>
          <SelectTrigger
            className="relative w-full h-10 bg-[#06162D] border border-[#2A303C]
              text-white rounded-lg px-3 pr-10 focus:ring-1 focus:ring-[#2A303C]
              focus:ring-offset-0 [&>svg]:hidden"
          >
            <SelectValue placeholder="Transaction Type" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0C2851] rounded-sm w-6 h-6 flex items-center justify-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-white opacity-80" />
            </span>
          </SelectTrigger>

          <SelectContent className="bg-[#06162D] border-[#2A303C] text-white z-50">
            {filterOptions[0].options.map((opt) => (
              <SelectItem key={opt} value={opt} className="cursor-pointer focus:bg-[#2A303C] focus:text-white">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SOURCE */}
        <Select value={source} onValueChange={(value) => setSource(value as TransactionSource | "All")}>
          <SelectTrigger
            className="relative w-full h-10 bg-[#06162D] border border-[#2A303C]
              text-white rounded-lg px-3 pr-10 focus:ring-1 focus:ring-[#2A303C]
              focus:ring-offset-0 [&>svg]:hidden"
          >
            <SelectValue placeholder="Source" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0C2851] rounded-sm w-6 h-6 flex items-center justify-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-white opacity-80" />
            </span>
          </SelectTrigger>

          <SelectContent className="bg-[#06162D] border-[#2A303C] text-white z-50">
            {filterOptions[1].options.map((opt) => (
              <SelectItem key={opt} value={opt} className="cursor-pointer focus:bg-[#2A303C] focus:text-white">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* RANGE */}
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger
            className="relative w-full h-10 bg-[#06162D] border border-[#2A303C]
              text-white rounded-lg px-3 pr-10 focus:ring-1 focus:ring-[#2A303C]
              focus:ring-offset-0 [&>svg]:hidden"
          >
            <SelectValue placeholder="Past 24 hours" />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0C2851] rounded-sm w-6 h-6 flex items-center justify-center pointer-events-none">
              <ChevronDown className="w-4 h-4 text-white opacity-80" />
            </span>
          </SelectTrigger>

          <SelectContent className="bg-[#06162D] border-[#2A303C] text-white z-50">
            {filterOptions[2].options.map((opt) => (
              <SelectItem key={opt} value={opt} className="cursor-pointer focus:bg-[#2A303C] focus:text-white">
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* ============================
          TABLE
      ============================ */}
      <div className="bg-[#06162D] rounded-xl border border-[#2A303C] overflow-hidden">
        {/* TABLE HEADER */}
        <div className="grid grid-cols-[1fr_1.8fr_1fr_1fr] px-4 md:px-6 py-3 text-xs md:text-sm text-neutral-400 border-b border-[#2A303C]">
          <span>Type</span>
          <span>Time</span>
          <span>Amount</span>
          <span className="text-right">Balance</span>
        </div>

        {/* TABLE BODY */}
        {isLoading ? (
          <div className="px-4 md:px-6 py-6 text-gray-400 text-sm">
            Loading transactions...
          </div>
        ) : rows.length === 0 ? (
          <div className="px-4 md:px-6 py-6 text-gray-400 text-sm">
            No transactions found.
          </div>
        ) : (
          <div className="divide-y divide-[#2A303C]">
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[1fr_1.8fr_1fr_1fr] px-4 md:px-6 py-4 text-xs md:text-sm text-white hover:bg-[#1f2430] transition"
              >
                <span>{row.type}</span>

                <span className="text-[11px] md:text-sm text-gray-300">
                  {row.time}
                </span>

                <span className="flex items-center gap-1 font-semibold text-yellow-500">
                  <Image src={gold_coin} alt="coin" className="w-4 h-4" />
                  {row.amount}
                </span>

                <span className="flex items-center justify-end gap-1 font-semibold text-yellow-500">
                  <Image src={gold_coin} alt="coin" className="w-4 h-4" />
                  {row.balance}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

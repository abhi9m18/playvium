"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { coingold, coingreen } from "@/assets/icons";

// ✅ Use Zustand stores
import { useAuthStore } from "@/store/auth-store";
import { useWalletStore } from "@/store/wallet-store";

type WalletRightProps = {
  header?: React.ReactNode;
};

export default function WalletRight({ header }: WalletRightProps) {
  const { token, isAuthenticated } = useAuthStore();
  const { wallet, isLoading, fetchWalletBalance } = useWalletStore();

  useEffect(() => {
    // Only fetch when user is authenticated
    if (token && isAuthenticated === "authenticated") {
      fetchWalletBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, isAuthenticated]);

  const currencies = [
    {
      name: "Wulf Cash",
      value: wallet ? wallet.wulfCash.toFixed(2) : "0.00",
      icon: coingreen,
      color: "text-[#6BF68B]",
    },
    {
      name: "Wulf Coin",
      value: wallet ? wallet.wulfCoin.toLocaleString() : "0",
      icon: coingold,
      color: "text-[#FBCC0E]",
    },
  ];

  return (
    <div className="min-h-screen space-y-4">
      {header}

      <h2 className="hidden md:block text-2xl font-bold text-white">Wallet</h2>

      <div className="bg-[#191D24] rounded-xl p-5 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-[#9590C0]">
            Your Currencies
          </span>
          <span className="text-sm font-semibold text-[#9590C0]">Value</span>
        </div>

        <div className="space-y-4">
          {currencies.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Image src={item.icon} width={22} height={22} alt={item.name} />

              <span
                className={`text-sm font-medium ${item.color} min-w-[120px]`}
              >
                {item.name}
              </span>

              <span className={`ml-auto text-sm font-semibold ${item.color} transition-opacity duration-200 ${isLoading && wallet ? 'opacity-50' : 'opacity-100'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/profile?tab=buy" className="flex-1 min-w-[140px]">
          <button className="w-full h-12 rounded-lg bg-[#384252] hover:bg-[#B93DEB] text-sm font-semibold text-white hover:opacity-90 transition">
            Buy Wulf Coin
          </button>
        </Link>

        <Link href="/profile?tab=redeem" className="flex-1 min-w-[120px]">
          <button className="w-full h-12 rounded-lg bg-[#384252] hover:bg-[#B93DEB] text-sm font-semibold text-white hover:opacity-90 transition">
            Redeem
          </button>
        </Link>

        <button className="flex-1 min-w-[120px] h-12 rounded-lg bg-[#384252] hover:bg-[#B93DEB] text-sm font-semibold text-white  transition">
          Daily Bonus
        </button>

        <button className="flex-1 min-w-[120px] h-12 rounded-lg bg-[#384252] hover:bg-[#B93DEB] text-sm font-semibold text-white transition">
          Top Up
        </button>
      </div>
    </div>
  );
}

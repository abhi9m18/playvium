"use client";

import Image, { StaticImageData } from "next/image";
import { d2, d3, d4, coingold, coingreen } from "@/assets/icons";
import type { ActiveBundle } from "@/lib/mock-site-data";

interface CashSectionProps {
  bundles: ActiveBundle[];
  loading: boolean;
  onSelectDiamond: (data: {
    bundleId: string;
    amount: number;
    price: number;
    free: string;
  }) => void;
}

const getBundleIcon = (coins: number): StaticImageData => {
  if (coins === 200000) return coingold;
  if (coins === 300000) return d2;
  if (coins === 500000) return d2;
  if (coins === 1000000) return d3;
  if (coins === 2000000) return d4;
  return coingold;
};

export default function CashSection({
  bundles,
  loading,
  onSelectDiamond,
}: CashSectionProps) {
  if (loading) {
    return <div className="mt-6 text-gray-400 text-sm">Loading coin packages...</div>;
  }

  if (!bundles || bundles.length === 0) {
    return <div className="mt-6 text-gray-400 text-sm">No active packages available.</div>;
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
      {bundles.map((bundle) => (
        <DiamondCard
          key={bundle.id}
          image={getBundleIcon(bundle.wulfCoinAmount)}
          amount={bundle.wulfCoinAmount}
          price={bundle.price}
          free={Number(bundle.bonusWulfCash).toFixed(2)}
          onSelect={() =>
            onSelectDiamond({
              bundleId: bundle.id,
              amount: bundle.wulfCoinAmount,
              price: bundle.price,
              free: Number(bundle.bonusWulfCash).toFixed(2),
            })
          }
        />
      ))}
    </div>
  );
}

interface CardProps {
  image: StaticImageData;
  amount: number;
  price: number;
  free: string;
  onSelect: () => void;
}

function DiamondCard({ image, amount, price, free, onSelect }: CardProps) {
  return (
    <div
      onClick={onSelect}
      className="w-full cursor-pointer rounded-lg border border-[#2A2D34] bg-[#191D24] transition hover:border-[#384252]"
    >
      <div className="flex items-center gap-2 border-b border-slate-800 px-2 py-1 sm:px-4 sm:py-2">
        <Image src={coingreen} alt="cash" width={16} height={16} />
        <span className="text-[10px] text-white sm:text-xs">{free} Free Wulf Cash</span>
      </div>

      <div className="flex justify-center py-3 sm:py-4">
        <Image src={image} alt="coin" width={90} height={90} />
      </div>

      <div className="text-center">
        <p className="text-lg font-semibold text-white sm:text-2xl">
          {amount.toLocaleString()}
        </p>
        <p className="mt-1 text-xs text-gray-400">Wulf Coin</p>
      </div>

      <div className="mt-3 rounded-b-lg bg-[#384252] px-3 py-3 hover:bg-purple-500">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">Prize</span>
          <span className="flex items-end gap-1 font-bold text-white">
            <span className="text-lg">{price}</span>
            <span className="mb-0.5 text-xs text-white/70">USD</span>
          </span>
        </div>
      </div>
    </div>
  );
}

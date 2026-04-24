"use client";

import Image, { StaticImageData } from "next/image";
import { d2, d3, d4, coingold, coingreen } from "@/assets/icons";

// ✅ API type (same fields you receive)
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
};

interface CashSectionProps {
  bundles: ActiveBundle[];
  loading: boolean;
  onSelectDiamond: (data: {
    bundleId: string;   // ✅ add this
    amount: number;
    price: number;
    free: string;
  }) => void;
}


// ✅ local image mapping (avoid remote next/image host config)
const getBundleIcon = (coins: number): StaticImageData => {
  if (coins === 200000) return coingold;
  if (coins === 300000) return d2;      // customize if you want
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
    return (
      <div className="mt-6 text-gray-400 text-sm">
        Loading coin packages...
      </div>
    );
  }

  if (!bundles || bundles.length === 0) {
    return (
      <div className="mt-6 text-gray-400 text-sm">
        No active packages available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-6">
      {bundles.map((b) => (
        <DiamondCard
          key={b.id}
          image={getBundleIcon(b.wulfCoinAmount)}
          amount={b.wulfCoinAmount}
          price={b.price}
          free={Number(b.bonusWulfCash).toFixed(2)} // ✅ decimal safe
          onSelect={() =>
           onSelectDiamond({
  bundleId: b.id,
  amount: b.wulfCoinAmount,
  price: b.price,
  free: Number(b.bonusWulfCash).toFixed(2),
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
      className="w-full bg-[#191D24] rounded-lg border border-[#2A2D34]
      hover:border-[#384252] cursor-pointer transition"
    >
      {/* FREE */}
      <div className="px-2 sm:px-4 py-1 sm:py-2 flex items-center gap-2 border-b border-slate-800">
        <Image src={coingreen} alt="cash" width={16} height={16} />
        <span className="text-[10px] sm:text-xs text-white">
          {free} Free Wulf Cash
        </span>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center py-3 sm:py-4">
        <Image src={image} alt="coin" width={90} height={90} />
      </div>

      {/* AMOUNT */}
      <div className="text-center">
        <p className="text-white text-lg sm:text-2xl font-semibold">
          {amount.toLocaleString()}
        </p>
        <p className="text-gray-400 text-xs mt-1">Wulf Coin</p>
      </div>

      {/* PRICE */}
      <div className="bg-[#384252] hover:bg-purple-500 mt-3 py-3 px-3 rounded-b-lg">
  <div className="flex justify-between items-center">
    <span className="text-white/80 text-sm">Prize</span>

    <span className="flex items-end gap-1 text-white font-bold">
      <span className="text-lg"> {price}</span>
      <span className="text-xs text-white/70 mb-0.5">USD</span>
    </span>
  </div>
</div>
    </div>
  );
}

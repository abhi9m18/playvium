"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { card, cash, coingreen } from "@/assets/icons";
import {giftbox, money} from '@/assets/images/profile'


interface Props {
  activeTab: "gift" | "cash";
  onChange: (tab: "gift" | "cash") => void;
}

export default function Tabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-4 mt-6">
      {/* GIFT CARD TAB */}
      <button
        onClick={() => onChange("gift")}
        className={cn(
          "flex-1 h-28 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all",
          activeTab === "gift"
           ? "bg-gray-500/20 border border-gray-600/40"
            :"bg-gray-800/40 border border-transparent"
        )}
      >
        <Image src={giftbox} alt="gift" width={45} height={45} />
        <span className={cn(
          "font-semibold",
          activeTab === "gift" ? "text-white" : "text-gray-400"
        )}>
          Gift Card
        </span>
      </button>

      {/* CASH PRIZE TAB */}
      <button
        onClick={() => onChange("cash")}
        className={cn(
          "flex-1 h-28 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all",
          activeTab === "cash"
           ? "bg-gray-500/20 border border-gray-600/40"
            : "bg-gray-800/40 border border-transparent"
        )}
      >
        <Image src={coingreen} alt="cash" width={45} height={45} />
        <span className={cn(
          "font-semibold",
          activeTab === "cash" ? "text-white" : "text-gray-400"
        )}>
          Cash Prize
        </span>
      </button>
    </div>
  );
}

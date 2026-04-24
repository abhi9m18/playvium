"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { card, cash, coingold } from "@/assets/icons";

interface TabsProps {
  activeTab: "cash" | "card";
  onChange: (tab: "cash" | "card") => void;
}

export default function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="">
      {/* CASH TAB */}
      {/* <button
        onClick={() => onChange("cash")}
        className={cn(
          "flex-1 h-28 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all",
          activeTab === "cash"
            ? "bg-gray-500/20 border border-gray-600/40"
            : "bg-gray-800/40 border border-transparent"
        )}
      >
        <Image src={coingold} alt="cash" width={45} height={45} />
        <span
          className={cn(
            "font-semibold text-xl",
            activeTab === "cash" ? "text-white" : "text-gray-400"
          )}
        >
          Cash
        </span>
      </button> */}

      {/* CARD TAB */}
      {/* <button
        onClick={() => onChange("card")}
        className={cn(
          "flex-1 h-28 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all",
          activeTab === "card"
            ? "bg-gray-500/20 border border-gray-600/40"
            : "bg-gray-800/40 border border-transparent"
        )}
      >
        <Image src={card} alt="card" width={45} height={45} />
        <span
          className={cn(
            "font-semibold text-xl",
            activeTab === "card" ? "text-white" : "text-gray-400"
          )}
        >
          Card
        </span>
      </button> */}
    </div>
  );
}

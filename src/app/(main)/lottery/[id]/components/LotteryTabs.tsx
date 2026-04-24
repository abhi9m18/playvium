"use client";

import { useEffect, useRef, useState } from "react";
import BuyLottery from "./BuyLottery";
import LotteryResults from "./LotteryResults";

const tabs = [
  { id: "buy", label: "Buy Lottery" },
  { id: "results", label: "Results" },
];

export default function LotteryTabs() {
  const [active, setActive] = useState<"buy" | "results">("buy");

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [widths, setWidths] = useState<number[]>([]);
  const [offsets, setOffsets] = useState<number[]>([]);
  const activeIndex = active === "buy" ? 0 : 1;

  useEffect(() => {
    const w = tabRefs.current.map((el) => el?.offsetWidth || 0);
    const o = tabRefs.current.map((el) => el?.offsetLeft || 0);
    setWidths(w);
    setOffsets(o);
  }, []);

  return (
    <div className="w-full flex flex-col items-start">

      {/* TAB CONTAINER (Auto-sized — NO full width) */}
      <div className="relative p-1 bg-[#000000]  rounded-xl border border-[#252C36] inline-flex">

        {/* SLIDING BG */}
        <div
          className="absolute top-1 bottom-1 bg-[#B93DEB] rounded-lg shadow-[0_0_10px_rgba(185,61,235,0.6)] transition-all duration-300"
          style={{
            width: widths[activeIndex] || 0,
            transform: `translateX(${offsets[activeIndex] || 0}px)`,
          }}
        />

        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[i] = el; }}
            onClick={() => setActive(tab.id as "buy" | "results")}
            className={`
              relative z-10 px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap
              ${active === tab.id ? "text-white" : "text-white/60 hover:text-white"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="mt-6 w-full">
        {active === "buy" ? <BuyLottery /> : <LotteryResults />}
      </div>
    </div>
  );
}

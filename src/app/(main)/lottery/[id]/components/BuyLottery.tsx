"use client";

import { useState } from "react";
import Image from "next/image";
import { flag2 } from "@/assets/icons/lottery";
import { ChevronDown } from "lucide-react";

export default function BuyLottery() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpen(open === key ? null : key);
  };

  const Arrow = ({ active }: { active: boolean }) => (
    <div className="w-7 h-7 rounded-md bg-[#2C3544] flex items-center justify-center transition-all">
      <ChevronDown
        size={16}
        strokeWidth={2}
        className={`text-white transition-transform duration-300 ${
          active ? "rotate-180" : "rotate-0"
        }`}
      />
    </div>
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mt-4 h-full">
      {/* LEFT PANEL */}
      <div className="w-full md:w-[65%] bg-[#1A1E26] rounded-xl p-4 border border-[#252C36]">
        <h2 className="text-white font-semibold text-[15px] mb-4">
          Standard bet
        </h2>

        <div className="space-y-1">
          {/* -------------------- ITEM 1 -------------------- */}
          <div>
            <button
              onClick={() => toggle("oddEven")}
              className="w-full bg-[#11151B] border border-[#2C3544] rounded-lg
                         px-4 py-4 flex items-center justify-between transition-all"
            >
              <span className="text-white/80 text-sm">Draw sum odd/even</span>
              <Arrow active={open === "oddEven"} />
            </button>

            {open === "oddEven" && (
              <div
                className="bg-[#151920]  border-t-0 
                              rounded-b-lg p-4  text-white/60 text-sm"
              >
                Choose whether the draw result will be <b>Odd</b> or <b>Even</b>
                .
              </div>
            )}
          </div>

          {/* -------------------- ITEM 2 -------------------- */}
          <div>
            <button
              onClick={() => toggle("total")}
              className="w-full bg-[#11151B] border border-[#2C3544] rounded-lg
                         px-4 py-4 flex items-center justify-between transition-all"
            >
              <span className="text-white/80 text-sm">Draw sum total</span>
              <Arrow active={open === "total"} />
            </button>

            {open === "total" && (
              <div
                className="bg-[#151920]  border-t-0 
                              rounded-b-lg p-4 text-white/60 text-sm"
              >
                Predict the exact <b>total</b> sum of all drawn numbers.
              </div>
            )}
          </div>

          {/* -------------------- ITEM 3 -------------------- */}
          <div>
            <button
              onClick={() => toggle("range")}
              className="w-full bg-[#11151B] border border-[#2C3544] rounded-lg
                         px-4 py-4 flex items-center justify-between transition-all"
            >
              <span className="text-white/80 text-sm">Draw sum range</span>
              <Arrow active={open === "range"} />
            </button>

            {open === "range" && (
              <div
                className="bg-[#151920]  border-t-0 
                              rounded-b-lg p-4 text-white/60 text-sm"
              >
                Select the <b>range</b> where the sum will fall.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="w-full md:w-[35%] bg-[#1A1E26] rounded-xl p-4 border border-[#252C36] flex flex-col justify-between h-full">
        {/* TOP CONTENT */}
        <div>
          <h3 className="text-white font-semibold text-[14px] mb-4">
            Choose your lucky numbers
          </h3>

          <div className="flex justify-between text-white/70 text-sm mb-2">
            <span>Potential Return</span>
            <span className="text-white font-medium">0 USD</span>
          </div>

          <div className="flex justify-between text-white/70 text-sm mb-6">
            <span>Total Bet Amount</span>
            <div className="flex items-center gap-1">
              <span className="text-white text-[13px] font-medium">0</span>
              <Image src={flag2} alt="currency" width={18} height={18} />
              <span className="text-white/60 text-[12px] pl-1">0.00</span>
            </div>
          </div>
        </div>

        {/* BOTTOM BUTTON */}
        <button
          className="w-full bg-[#B93DEB] hover:bg-[#a32dd6] text-white font-semibold
               text-sm py-3 rounded-lg transition-all shadow-[0_0_8px_rgba(185,61,235,0.4)] mt-4"
        >
          Add Bet
        </button>
      </div>
    </div>
  );
}

"use client";

import React from "react";
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

type BetHistoryProps = {
  header?: React.ReactNode;
};

/* ============================
   FILTER CONFIG
============================ */
const filterOptions = [
  {
    placeholder: "All Status",
    defaultValue: "All Status",
    options: [
      "All Status",
      "Not started",
      "On going",
      "Done",
      "Canceled/Fully Used",
      "Expired",
    ],
  },
  {
    placeholder: "All Type",
    defaultValue: "All Type",
    options: ["All Type", "Deposit", "Bonus"],
  },
];

/* ============================
   MOCK DATA
============================ */
const rolloverHistory = [
  {
    type: "Deposit",
    time: "15/1/2025 3:05AM",
    amount: "1,000",
    status: "Not started",
  },
  {
    type: "Bonus",
    time: "15/1/2025 3:05AM",
    amount: "1,000",
    status: "On going",
  },
  {
    type: "Deposit",
    time: "15/1/2025 3:05AM",
    amount: "1,000",
    status: "Done",
  },
];

export default function RolloverHistory({ header }: BetHistoryProps) {
  return (
    <div className="space-y-6">
      {/* MOBILE HEADER */}
      {header}

      {/* DESKTOP TITLE */}
      <p className="hidden md:block text-white text-2xl font-bold">
        Roll Over
      </p>

      {/* ============================
          FILTERS
      ============================ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filterOptions.map((filter, index) => (
          <Select key={index} defaultValue={filter.defaultValue}>
            <SelectTrigger
              className="
                relative w-full h-10
                bg-[#191D24] border border-[#2A303C]
                text-white rounded-lg
                px-3 pr-10

                hover:bg-[#191D24]
                hover:text-white

                focus:bg-[#191D24]
                focus:text-white
                focus:ring-1 focus:ring-[#2A303C]

                data-[state=open]:bg-[#191D24]
                data-[state=open]:text-white

                [&>svg]:hidden
              "
            >
              <SelectValue placeholder={filter.placeholder} />

              {/* CUSTOM ARROW */}
              <span
                className="
                  absolute right-2 top-1/2 -translate-y-1/2
                  bg-[#384252] rounded-sm
                  w-6 h-6
                  flex items-center justify-center
                  pointer-events-none
                "
              >
                <ChevronDown className="w-4 h-4 text-white opacity-80" />
              </span>
            </SelectTrigger>

            <SelectContent className="bg-[#191D24] border-[#2A303C] text-white z-50">
              {filter.options.map((option) => (
                <SelectItem
                  key={option}
                  value={option}
                  className="
                    cursor-pointer
                    text-white
                    focus:text-white
                    focus:bg-[#2A303C]
                    data-[highlighted]:bg-[#2A303C]
                    data-[highlighted]:text-white
                  "
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* ============================
          TABLE
      ============================ */}
      <div className="w-full bg-[#191D24] rounded-xl border border-[#2A303C] overflow-hidden">
        {/* TABLE HEADER */}
        <div
          className="
            grid
            grid-cols-[0.8fr_1.2fr_0.9fr_0.9fr]
            md:grid-cols-[1.5fr_2fr_1.5fr_1.5fr]
            gap-2 md:gap-4
            px-4 md:px-6 py-3
            text-xs md:text-sm
            text-neutral-400
            border-b border-[#343B45]
          "
        >
          <span>Type</span>
          <span>Time</span>
          <span>Amount</span>
          <span className="text-right">Status</span>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y divide-[#343B45]">
          {rolloverHistory.map((row, index) => (
            <div
              key={index}
              className="
                grid
                grid-cols-[0.8fr_1.2fr_0.9fr_0.9fr]
                md:grid-cols-[1.5fr_2fr_1.5fr_1.5fr]
                gap-2 md:gap-4
                px-4 md:px-6 py-4
                text-xs md:text-sm
                text-white
                hover:bg-[#1f2430]
                transition
              "
            >
              {/* TYPE */}
              <span>{row.type}</span>

              {/* TIME */}
              <span className="flex flex-col md:flex-row md:items-center text-[10px] md:text-sm">
                <span className="md:hidden">{row.time.split(" ")[0]}</span>
                <span className="md:hidden">{row.time.split(" ")[1]}</span>
                <span className="hidden md:inline">{row.time}</span>
              </span>

              {/* AMOUNT */}
              <span className="flex items-center gap-1 font-semibold text-yellow-400">
                <Image
                  src={gold_coin}
                  alt="coin"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
                {row.amount}
              </span>

              {/* STATUS */}
              <span
                className={`text-right font-semibold ${
                  row.status === "Done"
                    ? "text-green-400"
                    : row.status === "On going"
                    ? "text-[#FF9500]"
                    : row.status === "Expired"
                    ? "text-red-400"
                    : "text-[#FFCC00]"
                }`}
              >
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

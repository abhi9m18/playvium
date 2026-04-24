"use client";

import Image from "next/image";
import { flag2 } from "@/assets/icons/lottery";
import { lotteryidbaner, star } from "@/assets/icons";

export default function LotteryHeader({ id }: { id: string }) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* ================= TOP HEADER BAR ================= */}
      <div className="w-full bg-[#191D24] rounded-xl px-5 py-5 flex items-center justify-between">
        {/* LEFT: FLAG + TITLE + STAR */}
        <div className="flex items-center gap-3">
          <Image src={flag2} alt="flag" width={30} height={30} />

          <h1 className="text-white text-[16px] font-normal tracking-wide">
            FAST KENO 20/80
          </h1>

          <button className="ml-2 bg-[#2B3241] w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#3a4354] transition">
            <Image src={star} alt="fav" width={18} height={18} />
          </button>
        </div>
      </div>

      {/* ================= DETAILS ROW ================= */}
      <div className="w-full flex justify-between items-center px-1">
        {/* LEFT TEXT BLOCK */}
        <div className="flex flex-col text-white/80 text-[11px] md:text-[15px] leading-[22px] w-[65%] md:w-[40%]">
          <div className="flex items-center gap-4">
            <span>Next Draw Time</span>
            <span className="text-green-400 font-normal">
              11/6/2024, 11:54:00 AM
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <span>Next Draw Starts in</span>
            <span className="text-green-400 font-normal">
              00 d:00 h:03 m:39 s
            </span>
          </div>
          {/* ================= RECENT WINNING PRIZE BAR ================= */}
          <div className="bg-[#191D24] hidden md:flex mt-3 px-4 py-3 rounded-lg w-full justify-between items-center">
            <span className="text-white/75 text-[15px] md:text-[16px]">
              Recent winning prize
            </span>
            <span className="text-green-400  text-[18px] font-normal">
            3,000.00
            </span>
          </div>
        </div>

        <div className="w-[35%] md:w-[60%] flex justify-end">
          <Image
            src={lotteryidbaner}
            alt="lottery banner"
            className="w-48 md:w-56 lg:w-80 h-auto object-contain"
          />
        </div>
      </div>

      {/* ================= RECENT WINNING PRIZE BAR ================= */}
      <div className="bg-[#191D24]  md:hidden px-5 py-3 rounded-xl w-full flex justify-between items-center">
        <span className="text-white/75 text-[15px]">Recent winning prize</span>
        <span className="text-green-400 text-[18px] font-normal">
          3,000.00
        </span>
      </div>
    </div>
  );
}

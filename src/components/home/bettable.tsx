"use client";

import Image from "next/image";
import { useState } from "react";
import {  fortuneIcon } from "@/assets/images/home/bettable";
import { coingold, coingreen } from "@/assets/icons";

export default function LatestBetAndRace() {
  const isAuthenticated = true;

  const [activeTab, setActiveTab] = useState<"high" | "wager">("high");

  const data = Array(12).fill({
    game: "Transylvania Mania",
    player: "dudeabides17",
    time: "3:45 PM",
    buyIn: "1074.122150...",
    multiplier: "0.00x",
    win: "-589.0545...",
  });

  if (!isAuthenticated) return null;

  return (
    <section className="w-full mt-6 px-3 sm:px-4 md:px-6 lg:px-10">
      {/* Title + Right Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-3 sm:gap-0">
        <h2 className="text-white text-[16px] sm:text-[17px] md:text-[18px] font-semibold">
          Latest Bet and Race
        </h2>

        <div className="flex items-center bg-[#0C2851] border border-white/5 rounded-xl overflow-hidden w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("high")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm transition ${
              activeTab === "high"
                ? "bg-[#1B1F25] text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            High Roller
          </button>

          <button
            onClick={() => setActiveTab("wager")}
            className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 text-xs sm:text-sm transition ${
              activeTab === "wager"
                ? "bg-[#1B1F25] text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Wager Content
          </button>
        </div>
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="hidden md:block w-full bg-[#06162D] border border-white/5 rounded-2xl p-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full min-w-[700px] text-left">
          <thead>
            <tr className="text-white text-[15px]">
              <th className="pb-3 font-medium">Game</th>
              <th className="pb-3 font-medium">Player</th>
              <th className="pb-3 font-medium">Buy-In</th>
              <th className="pb-3 font-medium">Multiplier</th>
              <th className="pb-3 font-medium">Win/Loss</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-t border-white/5 text-sm text-white/80 hover:bg-[#1b1f25] transition"
              >
                {/* GAME */}
                <td className="py-3 flex items-center gap-2 font-medium text-white">
                  <Image
                    src={fortuneIcon}
                    alt="fortune"
                    className="w-5 h-5 object-contain"
                  />
                  {row.game}
                </td>

                {/* PLAYER */}
                <td className="py-3 text-white">{row.player}</td>

                {/* BUY-IN */}
                <td className="py-3">
                  <div className="flex items-center gap-2 text-yellow-400 font-semibold">
                    <Image
                      src={coingold}
                      alt="coin"
                      className="w-4 h-4 object-contain"
                    />
                    {row.buyIn}
                  </div>
                </td>

                {/* MULTIPLIER */}
                <td className="py-3 text-white">{row.multiplier}</td>

                {/* WIN / LOSS */}
                <td className="py-3">
                  <div className="flex items-center gap-2 text-[#03B739] font-normal">
                    <Image
                      src={coingreen}
                      alt="profit"
                      className="w-4 h-4 object-contain"
                    />
                    {row.win}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE HORIZONTAL SINGLE LINE VIEW - Matching Image */}
      <div className="md:hidden rounded-2xl w-[100%] overflow-hidden">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="bg-[#191D24] w-[100%]  px-1 py-2.5 hover:bg-[#2a2e35] transition flex items-center gap-3"
          >
            {/* Left - Game Icon */}
            <div className="w-[10%] h-10 rounded-lg flex items-center justify-center shrink-0">
              <Image
                src={fortuneIcon}
                alt={row.game}
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* Middle - Game Title & Player (Vertical) */}
            <div className="flex flex-col w-[35%] flex-1">
              <h3 className="text-white text-[11px] font-semibold truncate leading-tight">
                {row.game}
              </h3>
              <div className="flex items-center gap-1.5 text-white/60 text-[9px] leading-tight mt-0.5">
                <span className="truncate">{row.player}</span>
                <span className="text-[9px]">{row.time}</span>
              </div>
            </div>

            {/* Right - All Stats in One Line */}
            <div className="flex items-center gap-4 shrink-0 text-[9px]">
              {/* Buy-In */}
              <div className="flex flex-col items-start w-[25%] ">
                <span className="text-white/40 text-[11px] mb-0.5">Buy-In</span>
                <div className="flex items-center gap-0.5">
                  <Image
                    src={coingold}
                    alt="coin"
                    className="w-3 h-3 object-contain"
                  />
                  <span className="text-yellow-400 text-[9px] font-medium truncate">
                    {row.buyIn}
                  </span>
                </div>
              </div>

              {/* Multiplier */}
              <div className="flex flex-col items-start w-[15%]">
                <span className="text-white/40 text-[9px] mb-0.5">Multiplier</span>
                <span className="text-white text-[11px] font-medium">
                  {row.multiplier}
                </span>
              </div>

              {/* Win/Loss */}
              <div className="flex flex-col items-start w-[20%]">
                <span className="text-white/40 text-[9px] mb-0.5">Win/Loss</span>
                <div className="flex items-center gap-1">
                  <Image
                    src={coingreen}
                    alt="profit"
                    className="w-3 h-3 object-contain"
                  />
                  <span className="text-[#03B739] text-[11px] font-medium truncate">
                    {row.win}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
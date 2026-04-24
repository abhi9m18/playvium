"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { wulfcoin, fortuneIcon } from "@/assets/images/favorites";
import { coingold, coingreen } from "@/assets/icons";

type Bet = {
  id: number;
  game: string;
  user: string;
  time: string;
  buyIn: number;
  multiplier: string;
  winLoss: number;
  isGhost: boolean;
};

const FAKE_DATA: Bet[] = Array.from({ length: 40 }).map((_, i) => ({
  id: i + 1,
  game: "Transytvaria Mania",
  user: "dudeabides17",
  time: "3:45 PM",
  buyIn: 1000,
  multiplier: "0.51x",
  winLoss: 1000,
  isGhost: i % 3 === 0,
}));

export default function RecentsTable() {
  const [activeTab, setActiveTab] = useState("mybets");
  const [ghostMode, setGhostMode] = useState(false);
  const [limit, setLimit] = useState(10);
  const [openLimit, setOpenLimit] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Bet[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setData(FAKE_DATA);
      setLoading(false);
    }, 1200);
  }, []);

  const tabs = [
    { id: "mybets", label: "My Bets" },
    { id: "allbets", label: "All Bets" },
    { id: "rollers", label: "High Rollers" },
    { id: "race", label: "Race Leaderboard", dot: true },
  ];

  const filteredData = data
    .filter((row) => (ghostMode ? row.isGhost : true))
    .slice(0, limit);

  const SkeletonRow = () => (
    <div className="animate-pulse grid grid-cols-6 px-6 py-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 w-20 bg-white/10 rounded-md"></div>
      ))}
    </div>
  );

  return (
    <div className="w-full mt-6 px-0 mb-5">
      {/* ================= HEADER ================= */}
      <div className="w-full mb-4">
        {/* DESKTOP LAYOUT (unchanged) */}
        <div className="hidden md:flex justify-between items-center w-full">
          {/* Tabs */}
          <div className="flex items-center bg-[#14171D] p-1 border border-[#242B35] rounded-2xl shadow-[0_0_8px_rgba(255,255,255,0.05)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-[#B93DEB] text-white shadow-[0_0_10px_rgba(185,61,235,0.6)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
                {tab.dot && (
                  <>
                    <span className="absolute top-1/2 -translate-y-1/2 right-2 w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
                    <span className="absolute top-1/2 -translate-y-1/2 right-2 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_6px_rgba(255,0,128,0.8)]"></span>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Ghost Mode */}
            <div
              onClick={() => setGhostMode(!ghostMode)}
              className="flex items-center gap-2 cursor-pointer bg-[#14171D] px-4 py-2 rounded-xl"
            >
              <span className="text-white/80 text-sm">
                Ghost Mode {ghostMode ? "On" : "Off"}
              </span>
              <div
                className={`relative w-12 h-6 rounded-full flex items-center transition-all ${
                  ghostMode ? "bg-purple-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                    ghostMode ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </div>
            </div>

            {/* Limit Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenLimit(!openLimit)}
                className="flex items-center gap-2 bg-[#14171D] px-4 py-2 rounded-xl text-white/80 text-sm"
              >
                {limit}
                <ChevronDown className="w-4 h-4" />
              </button>

              {openLimit && (
                <div className="absolute right-0 mt-2 bg-[#1E222A] border border-white/10 rounded-lg shadow-lg overflow-hidden z-20">
                  {[10, 20, 50, 100].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setLimit(num);
                        setOpenLimit(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-white/80 hover:bg-white/10 text-sm"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= MOBILE LAYOUT ================= */}
        <div className="md:hidden flex flex-col gap-3">
          {/* Tabs - Grid 2x2 on small screens */}
          <div className="grid grid-cols-4 gap-0.5 bg-[#14171D] p-1 border border-[#242B35] rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-0 py-1 rounded-xl text-[10px] font-normal transition-all w-full text-center ${
                  activeTab === tab.id
                    ? "bg-[#B93DEB] text-white shadow-[0_0_10px_rgba(185,61,235,0.6)]"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Ghost Mode + Limit dropdown stacked */}
          <div className="flex flex-col ml-auto w-[70%] gap-2">
            {/* Ghost */}
            <div
              onClick={() => setGhostMode(!ghostMode)}
              className="flex items-center justify-between bg-[#14171D] px-4 py-2 rounded-xl"
            >
              <span className="text-white/80 text-sm">
                Ghost Mode {ghostMode ? "On" : "Off"}
              </span>
              <div
                className={`relative w-12 h-6 rounded-full flex items-center transition-all ${
                  ghostMode ? "bg-purple-500" : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-all ${
                    ghostMode ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </div>
            </div>

            {/* Limit Dropdown */}
            <div className="relative w-full">
              <button
                onClick={() => setOpenLimit(!openLimit)}
                className="flex items-center justify-between bg-[#14171D] px-4 py-2 rounded-xl text-white/80 text-sm w-full"
              >
                <span>Showing: {limit}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openLimit && (
                <div className="absolute right-0 mt-2 bg-[#1E222A] border border-white/10 rounded-lg shadow-lg overflow-hidden z-20 w-full">
                  {[10, 20, 50, 100].map((num) => (
                    <button
                      key={num}
                      onClick={() => {
                        setLimit(num);
                        setOpenLimit(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-white/80 hover:bg-white/10 text-sm"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* ===================== DESKTOP TABLE ================= */}
      {/* ===================================================== */}
      <div className="hidden md:block bg-[#14171D] w-full rounded-xl overflow-hidden border border-white/10">
        {/* Table Header */}
        <div className="grid grid-cols-6 text-white/60 text-[16px] px-6 py-3 border-b border-white/10">
          <span>Game</span>
          <span>User</span>
          <span>Time</span>
          <span>Buy in</span>
          <span>Multiplier</span>
          <span>Win/Loss</span>
        </div>

        <div className="divide-y divide-white/10">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)}

          {!loading &&
            filteredData.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-6 px-6 py-4 text-sm text-white/80 hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-2">
                  <Image src={fortuneIcon} alt="icon" className="w-5 h-5" />
                  {row.game}
                </div>

                <span>{row.user}</span>
                <span>{row.time}</span>

                <div className="flex items-center text-[#DBA727] gap-2">
                  <Image src={coingold} alt="coin" className="w-4 h-4" />
                  {row.buyIn}
                </div>

                <span>{row.multiplier}</span>

                <div className="flex items-center gap-2 text-green-400 font-medium">
                  <Image src={coingreen} alt="win" className="w-4 h-4" />
                  {row.winLoss}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ===================================================== */}
      {/* ====================== MOBILE CARDS ================= */}
      {/* ===================================================== */}
      <div className="md:hidden rounded-2xl w-full overflow-hidden mt-4">
        {!loading &&
          filteredData.map((row) => (
            <div
              key={row.id}
              className="bg-[#191D24] px-3 py-3 mb-2 rounded-xl hover:bg-[#2a2e35] transition flex items-center gap-3"
            >
              {/* icon */}
              <div className="w-[14%] flex items-center justify-center">
                <Image
                  src={fortuneIcon}
                  alt={row.game}
                  className="w-10 h-10 object-contain"
                />
              </div>

              {/* name + player */}
              <div className="flex flex-col w-[40%]">
                <h3 className="text-white text-[12px] font-semibold truncate leading-tight">
                  {row.game}
                </h3>
                <div className="flex items-center gap-2 text-white/60 text-[10px] leading-tight mt-0.5">
                  <span className="truncate">{row.user}</span>
                  <span>{row.time}</span>
                </div>
              </div>

              {/* stats */}
              <div className="flex items-center justify-between w-[46%] text-[10px]">
                {/* Buy-In */}
                <div className="flex flex-col w-[33%]">
                  <span className="text-white text-[10px]">Buy-In</span>
                  <div className="flex items-center gap-1">
                    <Image src={coingold} alt="coin" className="w-3 h-3" />
                    <span className="text-yellow-400 text-[10px]">
                      {row.buyIn}
                    </span>
                  </div>
                </div>

                {/* Multiplier */}
                <div className="flex flex-col w-[33%]">
                  <span className="text-white text-[10px]">Multiplier</span>
                  <span className="text-white text-[10px]">
                    {row.multiplier}
                  </span>
                </div>

                {/* Win/Loss */}
                <div className="flex flex-col w-[33%]">
                  <span className="text-white text-[10px]">Win/Loss</span>
                  <div className="flex items-center gap-1">
                    <Image src={coingreen} alt="profit" className="w-3 h-3" />
                    <span className="text-[#03B739] text-[10px] font-medium truncate">
                      {row.winLoss}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

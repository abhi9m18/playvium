"use client";

import { useState } from "react";
import {
  silvercoin,
  bronzecoin,
  diamondcoin,
  platinumcoin,
  immortalcoin,
  coin,
  mastercoin,
  cloud,
  money,
  rocket,
  svip,
  calender,
  message,
  spinwheel,
  lootbox,
  goldcoins,
  giveaway,
  makeitrain,
  monthlycashback,
  noreedem,
} from "@/assets/images/vip";
import Image from "next/image";
import { Star } from "lucide-react";
import { coingold } from "@/assets/icons";

export function VIPTiersTable() {
  const [selectedTier, setSelectedTier] = useState<number>(2);

  const tiers = [
    {
      name: "Bronze",
      color: "bg-slate-400",
      icon: bronzecoin,
      starColor: "#d58969",
      gradient: "from-[#3d2a1a] to-[#2a1f14]",
      cellBg: "bg-[#2a1f14]/50",
    },
    {
      name: "Silver ",
      color: "bg-slate-400",
      icon: silvercoin,
      starColor: "#ACB2BC",
      gradient: "from-[#3a3a3a] to-[#2a2a2a]",
      cellBg: "bg-[#2a2a2a]/50",
    },
    {
      name: "Gold ",
      color: "bg-yellow-400",
      icon: coin,
      starColor: "#F9BD5A",
      gradient: "from-[#4a3a1a] to-[#3a2a0a]",
      cellBg: "bg-[#3a2a0a]/50",
    },
    {
      name: "Platinum",
      color: "bg-cyan-400",
      icon: platinumcoin,
      starColor: "#0D98BA",
      gradient: "from-[#1a3a3d] to-[#0a2a2d]",
      cellBg: "bg-[#0a2a2d]/50",
    },
    {
      name: "Diamond",
      color: "bg-purple-400",
      icon: diamondcoin,
      starColor: "#89CFF0",
      gradient: "from-[#2a1a3d] to-[#1a0a2d]",
      cellBg: "bg-[#1a0a2d]/50",
    },
    {
      name: "Master",
      color: "bg-red-400",
      icon: mastercoin,
      starColor: "#DE2ADE",
      gradient: "from-[#3d1a2a] to-[#2d0a1a]",
      cellBg: "bg-[#2d0a1a]/50",
    },
    {
      name: "Immortal",
      color: "bg-red-400",
      icon: immortalcoin,
      starColor: "#FF0000",
      gradient: "from-[#3d1a0a] to-[#2d0a00]",
      cellBg: "bg-[#2d0a00]/50",
    },
  ];

  const benefits = [
    { name: "Make it Rain", icon: makeitrain, availableFrom: 0 },
    { name: "Playvium Coin Drops", icon: coingold, availableFrom: 0 },
    { name: "Private Chat", icon: message, availableFrom: 1 },
    { name: "Tips", icon: money, availableFrom: 1 },
    { name: "VIP Spin", icon: spinwheel, availableFrom: 1 },
    { name: "Level-up Bonus", icon: lootbox, availableFrom: 2 },
    { name: "Recharge", icon: rocket, availableFrom: 3 },
    { name: "Weekly Cashback", icon: calender, availableFrom: 3 },
    { name: "Monthly Cashback", icon: monthlycashback, availableFrom: 4 },
    { name: "No Redeem Rules", icon: noreedem, availableFrom: 4 },
    { name: "Exclusive SVIP Perks", icon: svip, availableFrom: 5 },
    { name: "Luxury Giveaway", icon: giveaway, availableFrom: 6 },
  ];

  return (
    <div id="target-section" className="space-y-4 rounded-xl">
      <div>
        <h2 className="text-sm sm:text-2xl font-bold text-white mb-2">
          Exclusive VIP System
        </h2>
        <p className="text-xs text-slate-400 sm:text-sm">
          Discover the ultimate gaming Experience
        </p>
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg bg-[#171B21]">
        <div className="inline-block min-w-full align-middle">
          <table
            className="w-full border-collapse table-fixed"
            style={{ minWidth: "700px" }}
          >
            <thead>
              <tr>
                <th className="text-left py-4 px-4 text-slate-400 font-medium text-sm w-1/8 sticky left-0 z-10 bg-[#171B21]">
                  Bonus Type
                </th>
                {tiers.map((tier, idx) => (
                  <th
                    key={idx}
                    onClick={() => setSelectedTier(idx)}
                    className={`text-center py-4 px-2 text-sm w-1/8 cursor-pointer transition-all ${
                      idx === selectedTier
                        ? `bg-linear-to-b ${tier.gradient}`
                        : ""
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 shrink-0">
                        <Image
                          src={tier.icon}
                          alt={tier.name}
                          width={40}
                          height={40}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-normal text-slate-300">
                        {tier.name}
                      </p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit, idx) => {
                return (
                  <tr key={idx} className="border-b border-slate-700/30">
                    <td className="py-3 px-4 text-slate-300 text-sm font-medium sticky left-0 z-10 bg-[#171B21]">
                      <div className="flex items-center justify-start gap-2">
                        <div className="w-10 h-10 shrink-0">
                          <Image
                            src={benefit.icon}
                            alt={benefit.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <p className="text-xs font-normal text-slate-300 whitespace-nowrap">
                          {benefit.name}
                        </p>
                      </div>
                    </td>
                    {tiers.map((tier, tierIdx) => (
                      <td
                        key={tierIdx}
                        className={`text-center py-3 px-2 ${
                          tierIdx === selectedTier ? tier.cellBg : ""
                        }`}
                      >
                        {tierIdx >= benefit.availableFrom ? (
                          <div className="flex justify-center">
                            <Star
                              className="w-5 h-5"
                              fill={tier.starColor}
                              stroke={tier.starColor}
                            />
                          </div>
                        ) : (
                          <span className="text-white text-sm">--</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-[#171B21] rounded-lg sm:hidden overflow-hidden">
        {/* HEADER */}
        <div className="bg-[#384252] h-12 px-3 border-b border-slate-700/30 flex items-center">
          {/* Left Column */}
          <div className="w-24 text-[10px] font-medium leading-tight">
            Bonus Type
          </div>

          {/* Tier Icons */}
          <div className="flex-1 flex justify-between">
            {tiers.map((tier, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTier(idx)}
                className="flex flex-col items-center gap-px"
              >
                <Image
                  src={tier.icon}
                  alt={tier.name}
                  width={18}
                  height={18}
                  className="w-4 h-4"
                />
                <p className="text-[4px] leading-none">{tier.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT ROWS */}
        <div className="divide-y divide-slate-700/30">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center h-12 bg-[#171B21] px-3">
              {/* Left column – same width as header */}
              <div className="w-24 flex items-center gap-1">
                <Image
                  src={benefit.icon}
                  alt={benefit.name}
                  width={28}
                  height={28}
                  className="w-7 h-7"
                />
                <p className="text-[6px] font-medium">{benefit.name}</p>
              </div>

              {/* Stars */}
              <div className="flex-1 flex justify-between">
                {tiers.map((tier, tierIdx) =>
                  tierIdx >= benefit.availableFrom ? (
                    <Star
                      key={tierIdx}
                      className="w-3 h-3"
                      fill={tier.starColor}
                      stroke={tier.starColor}
                    />
                  ) : (
                    <span key={tierIdx} className="text-slate-600 text-[10px]">
                      --
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

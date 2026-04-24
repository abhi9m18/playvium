"use client";

import { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

import {
  silvercoin,
  bronzecoin,
  diamondcoin,
  platinumcoin,
  immortalcoin,
  coin,
  mastercoin,
  money,
  rocket,
  svip,
  calender,
  message,
  spinwheel,
  lootbox,
  giveaway,
  makeitrain,
  monthlycashback,
  noreedem,
} from "@/assets/images/vip";

import { coingold } from "@/assets/icons";
import { landingvipbanner } from "@/assets/landing";
import { Info } from "lucide-react";
import InfoModal, { VIP_BENEFIT_INFO } from "../models/InfoModal";

export default function LandingVIPTiersTable() {
  const [selectedTier, setSelectedTier] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
const [modalTitle, setModalTitle] = useState("");
const [modalData, setModalData] = useState<any>(null);


  const BONUS_COL_WIDTH = 240;
  const TOTAL_TIERS = 7;

  const tiers = [
    {
      name: "Bronze",
      icon: bronzecoin,
      star: "#D58969",
      gradient: "linear-gradient(to bottom,#765130,#323738)",
    },
    {
      name: "Silver",
      icon: silvercoin,
      star: "#BFC6D1",
      gradient: "linear-gradient(to bottom,#4a4a4a,#323738)",
    },
    {
      name: "Gold",
      icon: coin,
      star: "#F9BD5A",
      gradient: "linear-gradient(to bottom,#6a4a1a,#1a1206)",
    },
    {
      name: "Platinum",
      icon: platinumcoin,
      star: "#4CC3D9",
      gradient: "linear-gradient(to bottom,#1a4a4f,#323738)",
    },
    {
      name: "Diamond",
      icon: diamondcoin,
      star: "#8ED4FF",
      gradient: "linear-gradient(to bottom,#3a2a5f,#323738)",
    },
    {
      name: "Master",
      icon: mastercoin,
      star: "#DE2ADE",
      gradient: "linear-gradient(to bottom,#5a1f4a,#323738)",
    },
    {
      name: "Immortal",
      icon: immortalcoin,
      star: "#FF2B2B",
      gradient: "linear-gradient(to bottom,#6a1a0a,#323738)",
    },
  ];

  const benefits = [
    { name: "Make it Rain", icon: makeitrain, from: 0 },
    { name: "Playvium Coin Drops", icon: coingold, from: 0 },
    { name: "Private Chat", icon: message, from: 1 },
    { name: "Tips", icon: money, from: 1 },
    { name: "VIP Spin", icon: spinwheel, from: 1 },
    { name: "Level-up Bonus", icon: lootbox, from: 2 },
    { name: "Recharge", icon: rocket, from: 3 },
    { name: "Weekly Cashback", icon: calender, from: 3 },
    { name: "Monthly Cashback", icon: monthlycashback, from: 4 },
    { name: "No Redeem Rules", icon: noreedem, from: 4 },
    { name: "Exclusive SVIP Perks", icon: svip, from: 5 },
    { name: "Luxury Giveaway", icon: giveaway, from: 6 },
  ];

  return (
    <section className="relative w-full xl:w-[1225px] mx-auto bg-linear-to-b from-[#15181E] to-[#765130] my-8 py-5 md:py-20 rounded-t-xl overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <Image
        src={landingvipbanner}
        alt="VIP Background"
        fill
        priority
        className="object-cover opacity-30"
      />

      {/* DARK GRADIENT OVERLAY */}
      {/* <div className="absolute inset-0 bg-linear-to-b from-[#15181E] to-[#FF8A2100] z-10" /> */}

      {/* CONTENT */}
      <div className="relative max-w-6xl text-center mx-auto p-2 sm:p-6 z-30">
        <h2 className="text-white text-xl md:text-3xl font-bold mb-2">
          Exclusive VIP System
        </h2>
        <p className="text-white/60 text-[12px] md:text-[15px] pb-5">
          Experience premium perks and special rewards with our Exclusive
          Ranking System
        </p>

        {/* DESKTOP TABLE */}
        <div className="relative mt-2 md:mt-6 rounded-lg bg-[#171B21]/90 overflow-x-auto">
          <div className="relative min-w-[900px]">
            {/* COLUMN GRADIENT */}
            <div
              className="absolute top-0 bottom-0 z-0 transition-all duration-300"
              style={{
                width: `calc((100% - ${BONUS_COL_WIDTH}px) / ${TOTAL_TIERS})`,
                left: `calc(${BONUS_COL_WIDTH}px + (${selectedTier} * ((100% - ${BONUS_COL_WIDTH}px) / ${TOTAL_TIERS})))`,
                background: tiers[selectedTier].gradient,
                opacity: 0.75,
              }}
            />
            <div
              className="absolute top-0 bottom-0 left-0 z-10 bg-[#171B21]"
              style={{ width: BONUS_COL_WIDTH }}
            />
            <table className="relative z-10 w-full table-fixed border-collapse">
              <thead>
                <tr>
                  <th
                    className="sticky left-0 z-20 bg-[#171B21] px-4 py-4 text-left text-sm text-slate-400"
                    style={{ width: BONUS_COL_WIDTH }}
                  >
                    Bonus Type
                  </th>

                  {tiers.map((tier, idx) => (
                    <th
                      key={idx}
                      onClick={() => setSelectedTier(idx)}
                      className="cursor-pointer px-2 py-4 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Image
                          src={tier.icon}
                          alt={tier.name}
                          width={40}
                          height={40}
                        />
                        <span className="text-sm text-slate-300">
                          {tier.name}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {benefits.map((b, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-t border-none md:border-white/5"
                  >
                    <td
                      className="sticky left-0 z-20 bg-[#171B21] px-4 py-2"
                      style={{ width: BONUS_COL_WIDTH }}
                    >
                      <div className="flex items-center gap-3 text-left">
                        <Image
                          src={b.icon}
                          alt={b.name}
                          width={38}
                          height={38}
                        />
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-slate-300">
                            {b.name}
                          </span>

                          {VIP_BENEFIT_INFO[b.name] && (
                            <button
                              onClick={() => {
                                setModalTitle(b.name);
                                setModalData(VIP_BENEFIT_INFO[b.name]);
                                setModalOpen(true);
                              }}
                              className="text-white/50 hover:text-white"
                            >
                              <Info size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </td>

                    {tiers.map((tier, colIdx) => (
                      <td key={colIdx} className="py-2 text-center">
                        <div className="flex items-center justify-center">
                          {colIdx >= b.from ? (
                            <Star
                              size={18}
                              fill={tier.star}
                              stroke={tier.star}
                            />
                          ) : (
                            <span className="text-white">--</span>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <InfoModal
  open={modalOpen}
  onClose={() => setModalOpen(false)}
  title={modalTitle}
  data={modalData}
/>

    </section>
  );
}

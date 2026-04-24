"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import {
  vipmobilebg,
  vipcard,
  coin,
  silvercoin,
  bronzecoin,
  platinumcoin,
  diamondcoin,
  mastercoin,
} from "@/assets/images/vip";

// Define tier structure
interface Tier {
  name: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: StaticImageData;
  minProgress: number;
  maxProgress: number;
  subTiers: string[];
}

const tiers: Tier[] = [
  {
    name: "Bronze",
    color: "#CD7F32",
    gradientFrom: "#8B4513",
    gradientTo: "#D2691E",
    icon: bronzecoin,
    minProgress: 0,
    maxProgress: 13.3,
    subTiers: ["Bronze I", "Bronze II", "Bronze III"],
  },
  {
    name: "Silver",
    color: "#C0C0C0",
    gradientFrom: "#808080",
    gradientTo: "#E8E8E8",
    icon: silvercoin,
    minProgress: 13.3,
    maxProgress: 26.6,
    subTiers: ["Silver I", "Silver II", "Silver III"],
  },
  {
    name: "Gold I",
    color: "#FACD02",
    gradientFrom: "#DAA520",
    gradientTo: "#FFD700",
    icon: coin,
    minProgress: 26.6,
    maxProgress: 36,
    subTiers: ["Gold I", "Gold II", "Gold III"],
  },
  {
    name: "Platinum",
    color: "#E5E4E2",
    gradientFrom: "#B0B0B0",
    gradientTo: "#F0F0F0",
    icon: platinumcoin,
    minProgress: 36,
    maxProgress: 46.6,
    subTiers: ["Platinum I", "Platinum II", "Platinum III"],
  },
  {
    name: "Diamond",
    color: "#B9F2FF",
    gradientFrom: "#4A90E2",
    gradientTo: "#B9F2FF",
    icon: diamondcoin,
    minProgress: 46.6,
    maxProgress: 133.3,
    subTiers: ["Diamond I", "Diamond II", "Diamond III"],
  },
  {
    name: "Master",
    color: "#FF6B6B",
    gradientFrom: "#DC143C",
    gradientTo: "#FF6B6B",
    icon: mastercoin,
    minProgress: 166.6,
    maxProgress: 200,
    subTiers: ["Master"],
  },
];

function getTierFromProgress(progress: number): {
  tier: Tier;
  subTierIndex: number;
  subTierProgress: number;
} {
  const tier =
    tiers.find((t) => progress >= t.minProgress && progress < t.maxProgress) ||
    tiers[tiers.length - 1];

  // Calculate which sub-tier (I, II, III) within the main tier
  const tierRange = tier.maxProgress - tier.minProgress;
  const progressInTier = progress - tier.minProgress;
  const subTierSize = tierRange / tier.subTiers.length;
  const subTierIndex = Math.min(
    Math.floor(progressInTier / subTierSize),
    tier.subTiers.length - 1
  );

  // Calculate progress within the current sub-tier (0-100%)
  const progressInSubTier =
    ((progressInTier % subTierSize) / subTierSize) * 100;

  return { tier, subTierIndex, subTierProgress: progressInSubTier };
}

function getUpcomingTiers(
  currentProgress: number
): { icon: StaticImageData; label: string; amount: string; change: string }[] {
  const currentTierIndex = tiers.findIndex(
    (tier) =>
      currentProgress >= tier.minProgress && currentProgress <= tier.maxProgress
  );
  const upcomingTiers = tiers.slice(currentTierIndex + 1, currentTierIndex + 4);

  const wagerAmounts = ["2,645,000.00", "5,000,000.00", "10,000,000.00"];
  const bonuses = ["+234.00", "+500.00", "+1,000.00"];

  return upcomingTiers.map((tier, idx) => ({
    icon: tier.icon,
    label: tier.name,
    amount: wagerAmounts[idx] || "15,000,000.00",
    change: bonuses[idx] || "+2,000.00",
  }));
}

export function VIPCardTop() {
  const [progress, setProgress] = useState(27);

  const currentTier = useMemo(() => getTierFromProgress(progress), [progress]);
  const upcomingRewards = useMemo(() => getUpcomingTiers(progress), [progress]);

  return (
    <div className="p-1 ">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Left Card - Current Tier (Desktop) */}
        <div
          className="lg:col-span-1 hidden sm:block rounded-2xl p-8 bg-[#77617c] text-white relative overflow-visible bg-cover bg-center"
          style={{ backgroundImage: `url(${vipcard.src})`, height: "260px" }}
        >
          {/* Animated tier icon */}
          <div className="absolute -top-12 left-16 z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTier.tier.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <img
                  src={currentTier.tier.icon.src}
                  alt="Badge"
                  className="md:w-36 md:h-36 object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 space-y-4 top-15">
            <div className="flex justify-between">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={currentTier.tier.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl ml-1 px-16 py-2 font-bold"
                  style={{ color: currentTier.tier.color }}
                >
                  {currentTier.tier.name}
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="space-y-3 px-8">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90 text-white">
                  Your VIP Progress 
                </span>
                <motion.span
                  className="font-semibold text-white"
                  key={progress}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* PROGRESS BAR */}
              <div className="relative">
                {/* INTERACTIVE INPUT */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="absolute w-full h-3 opacity-0 cursor-pointer z-20"
                />

                {/* BAR */}
                <div className="relative w-full bg-[#1F1D24] rounded-full h-2">
                  {/* ACTIVE PROGRESS */}
                  <motion.div
                    className="rounded-full h-2 bg-yellow-400"
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* CURRENT POINT (BUTTON STYLE) */}
                  <motion.button
                    className="absolute top-1/2 -translate-y-1/2 
                   w-5 h-5 rounded-full bg-gray-400 
                   border-5 border-yellow-400 z-30"
                    style={{ left: `calc(${progress}% - 10px)` }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />

                  {/* GOLD II POINT */}
                  <div
                    className="absolute top-8 -translate-y-1/2"
                    style={{ left: "80%" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="rotate-180 ml-4"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M8.00008 0C3.58908 0 8.14446e-05 3.589 8.14446e-05 7.995C-0.0289186 14.44 7.69608 19.784 8.00008 20C8.00008 20 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00008 0Z"
                        fill="#CCAC16"
                      />
                    </svg>
                    <span className="block text-sm text-yellow-400 mt-1 text-center">
                      Gold III
                    </span>
                  </div>

                  {/* GOLD III POINT */}
                  <div
                    className="absolute -top-6 -translate-y-1/2"
                    style={{ left: "40%" }}
                  >
                    <span className="block text-sm text-yellow-400 mt-1 text-center">
                      Gold II
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-3"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M8.00008 0C3.58908 0 8.14446e-05 3.589 8.14446e-05 7.995C-0.0289186 14.44 7.69608 19.784 8.00008 20C8.00008 20 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00008 0Z"
                        fill="#CCAC16"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* LINK */}
              <button
                onClick={() => {
                  document
                    .getElementById("target-section")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-sm text-pink-400 hover:underline"
              >
                View level up detail
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Card */}
        <div
          className="lg:col-span-1 sm:hidden bg-[#000000] rounded-xl p-6 text-white relative overflow-visible bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${vipmobilebg.src})`,
            height: "150px",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-black/30 rounded-xl z-0"></div>

          {/* Background decorative triangle */}
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-30">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="100,0 100,100 0,100" fill="#1a2332" />
            </svg>
          </div>

          {/* Content wrapper */}
          <div className="z-10">
            <div className="flex">
              {/* Top section with badge and tier name */}
              <div className="flex w-[30%] items-center gap-4 mb-6">
                {/* Badge icon */}
                <div className="shrink-0 left-0 z-20 relative -top-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTier.tier.name}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    >
                      <img
                        src={currentTier.tier.icon.src}
                        alt="Badge"
                        width={60}
                        height={60}
                        className="w-16 h-16 object-cover rounded-full shadow-lg"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Tier name */}
                <div className="hidden sm:block">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={currentTier.tier.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl  font-bold"
                      style={{
                        color: currentTier.tier.color,
                        fontSize: "12px",
                      }}
                    >
                      {currentTier.tier.name}
                    </motion.h1>
                  </AnimatePresence>
                </div>
              </div>

              {/* Progress section */}
              <div className="space-y-3 z-50 w-[70%]">
                <div className="sm:hidden">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={currentTier.tier.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="text-3xl font-bold"
                      style={{
                        color: currentTier.tier.color,
                        fontSize: "12px",
                      }}
                    >
                      {currentTier.tier.name}
                    </motion.h1>
                  </AnimatePresence>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    Your VIP Progress 2324
                  </span>
                  <motion.span
                    className="font-semibold text-white text-lg"
                    key={progress}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {progress}%
                  </motion.span>
                </div>

                {/* Progress bar with milestone markers */}
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="absolute w-full h-3 opacity-0 cursor-pointer z-20 top-8"
                  />

                  {/* Progress bar */}
                  <div className="w-full bg-[#1a2332] rounded-full h-1 mt-2">
                    {/* GOLD III POINT */}
<div
  className="absolute top-8 -translate-y-1/2"
  style={{ left: "80%" }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="rotate-180 ml-4"
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
  >
    <path
      d="M8.00008 0C3.58908 0 8.14446e-05 3.589 8.14446e-05 7.995C-0.0289186 14.44 7.69608 19.784 8.00008 20C8.00008 20 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00008 0Z"
      fill="#CCAC16"
    />
  </svg>
  <span className="block text-sm text-yellow-400 mt-1 text-center">
    Gold III
  </span>
</div>

{/* GOLD II POINT */}
<div
  className="absolute -top-6 -translate-y-1/2"
  style={{ left: "40%" }}
>
  <span className="block text-sm text-yellow-400 mt-1 text-center">
    Gold II
  </span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="ml-3"
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
  >
    <path
      d="M8.00008 0C3.58908 0 8.14446e-05 3.589 8.14446e-05 7.995C-0.0289186 14.44 7.69608 19.784 8.00008 20C8.00008 20 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00008 0Z"
      fill="#CCAC16"
    />
  </svg>
</div>
                    <motion.div
                      className="rounded-full h-1 relative"
                      style={{ backgroundColor: currentTier.tier.color }}
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      {/* Progress indicator dot */}
                      <motion.div
                        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: currentTier.tier.color }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards - Rewards */}
        <div className="bg-[#191D24] p-3 rounded-xl">
          <span className="text-xs text-gray-100 px-2">Rank & Bonuses</span>
          <div className="space-y-2 mt-1">
            <AnimatePresence mode="popLayout">
              {upcomingRewards.map((reward, idx) => (
                <motion.div
                  key={reward.label}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="bg-[#2f394a] backdrop-blur  rounded-2xl p-2 flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <motion.span
                      className="text-2xl"
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <img
                        src={reward.icon.src}
                        alt="Badge"
                        className="h-6 w-6 md:w-12 md:h-12 object-cover"
                      />
                    </motion.span>
                    <div>
                      <div className="font-semibold text-white">
                        {reward.label}
                      </div>
                      <div className="text-white">
                        <span className="text-[#9DA8AA]">Wager </span>
                        {reward.amount}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-semibold flex items-center gap-1">
                    {/* <ArrowUpRight className="w-4 h-4" /> */}
                    {reward.change}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

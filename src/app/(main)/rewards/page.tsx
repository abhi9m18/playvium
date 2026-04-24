"use client";

import { MixedContentWrapper } from "@/components/MixedContentWrapper";

import {
  ClaimedReward,
  ClaimedRewardsGrid,
} from "./components/claimed-rewards-grid";
import { CurrentRankCard } from "./components/current-rank-card";
import { RakebackSection } from "./components/rakeback-section";
import { RankBonus, RankBonusesList } from "./components/rank-bonuses-list";
import { VaultHeader } from "./components/vault-header";
import { VaultSchedule } from "./components/vault-schedule";

import {
  diamondcoin,
  platinumcoin,
  mastercoin,
  RewardBanner2,
} from "@/assets/images/vip";
import RewardBanner from "./components/Rewardbanner";

export default function RewardsVault() {
  return (
    <MixedContentWrapper
      publicContent={<PublicRewardsVault />}
      privateContent={<PrivateRewardsVault />}
    />
  );
}

/* ===================== PUBLIC (BEFORE LOGIN) ===================== */

function PublicRewardsVault() {
  const ranks: RankBonus[] = [
    {
      name: "Platinum",
      wager: "465,000.00",
      bonus: "+34.00",
      color: "bg-cyan-400",
      image: platinumcoin,
    },
    {
      name: "Diamond",
      wager: "645,000.00",
      bonus: "+164.00",
      color: "bg-purple-400",
      image: diamondcoin,
    },
    {
      name: "Master",
      wager: "855,000.00",
      bonus: "+614.00",
      color: "bg-red-400",
      image: mastercoin,
    },
  ];

  return (
    <div className="px-4 mx-auto space-y-6">
      <RewardBanner />
      {/* <VaultHeader /> */}
      <VaultSchedule />

      {/* Public teaser view */}
      <RankBonusesList ranks={ranks} />
    </div>
  );
}

/* ===================== PRIVATE (AFTER LOGIN) ===================== */

function PrivateRewardsVault() {
  const ranks: RankBonus[] = [
    {
      name: "Platinum",
      wager: "465,000.00",
      bonus: "+34.00",
      color: "bg-cyan-400",
      image: platinumcoin,
    },
    {
      name: "Diamond",
      wager: "645,000.00",
      bonus: "+164.00",
      color: "bg-purple-400",
      image: diamondcoin,
    },
    {
      name: "Master",
      wager: "855,000.00",
      bonus: "+614.00",
      color: "bg-red-400",
      image: mastercoin,
    },
  ];

  const claimedRewards: ClaimedReward[] = [
    { label: "Total Rewards", value: "17,509.22" },
    { label: "Vault", value: "11,665.70" },
    { label: "Instant Rakeback", value: "966.91" },
    { label: "Daily Bonus", value: "2,035.97" },
    { label: "Weekly Bonus", value: "1,509.22" },
    { label: "Monthly Bonus", value: "965.17" },
    { label: "Rankup Bonus", value: "765.84" },
  ];

  const handleClaim = () => {
    console.log("Claim clicked");
  };

  return (
    <div className="px-4 mx-auto space-y-6">
      <VaultHeader />
      <VaultSchedule />
      <RakebackSection />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CurrentRankCard
          rank="Gold"
          progress={10}
          wagerRemaining="200"
          onClaim={handleClaim}
        />
        <RankBonusesList ranks={ranks} />
      </div>

      <ClaimedRewardsGrid rewards={claimedRewards} />
    </div>
  );
}

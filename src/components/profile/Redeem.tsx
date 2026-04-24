"use client";

import { useState } from "react";
import Tabs from "@/components/profile/redeem/Tabs";
import GiftSection from "@/components/profile/redeem/GiftSection";
import CashPrizeSection from "@/components/profile/redeem/CashPrizeSection";
import React from "react";

type RedeemProps = {
  header?: React.ReactNode;
};

export default function Redeem({ header }: RedeemProps) {
  const [tab, setTab] = useState<"gift" | "cash">("gift");

  return (
    <div className="w-full">

      {/* MOBILE HEADER → back button + title */}
      {header}

      {/* DESKTOP TITLE */}
      <h2 className="hidden md:block text-white text-2xl font-bold">Redeem</h2>

      {/* INNER TABS */}
      <Tabs activeTab={tab} onChange={setTab} />

      {/* TAB CONTENT */}
      <div className="mt-8">
        {tab === "gift" && <GiftSection />}
        {tab === "cash" && <GiftSection />}
        {/* {tab === "cash" && <CashPrizeSection />} */}
      </div>
    </div>
  );
}

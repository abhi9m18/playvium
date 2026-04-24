"use client";

import { useState } from "react";
import Tabs, { TabKey } from "./components/tabs";

import Dashboard from "./components/dashboard1";
import MyRewards from "./components/myrewards";
import ReferralCodes from "./components/referralcodes";
import RateRules from "./components/raterules";
import DownloadBanners from "./components/downloadbanners";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  return (
    <div className="min-h-screen pt-16 p-4 bg-[#15181E] font-sans">
      <main className="flex flex-col">
        <div className="w-full">
          <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 space-y-4">
            {/* PAGE TITLE */}
            <h2 className="text-white ml-2 text-xl md:text-2xl">
              Referrals
            </h2>

            {/* TABS */}
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* TAB CONTENT */}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "rewards" && <MyRewards />}
            {activeTab === "referral" && <ReferralCodes />}
            {activeTab === "rules" && <RateRules />}
            {activeTab === "banners" && <DownloadBanners />}
          </div>
        </div>
      </main>
    </div>
  );
}

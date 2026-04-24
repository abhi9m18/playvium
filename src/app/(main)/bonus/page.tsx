"use client";

import { useState } from "react";
import { MixedContentWrapper } from "@/components/MixedContentWrapper";
import PromotionGrid from "../promotions/components/promotion-grid";
import PromotionTabs from "../promotions/components/promotion-tabs";
import BonusBanner from "./components/bonusbanner";

export default function BonusPage() {
  return (
    <MixedContentWrapper
      publicContent={<PublicBonus />}
      privateContent={<PrivateBonus />}
    />
  );
}

function PublicBonus() {
  const [activeTab, setActiveTab] = useState<"latest" | "archived">("latest");

  return (
    <div className="w-full mx-auto md:ml-2 py-2 space-y-4 text-white">
      {/* <h1 className="text-2xl font-medium ml-5">Bonus</h1> */}
      <BonusBanner/>

      <PromotionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PromotionGrid activeTab={activeTab} />
    </div>
  );
}

function PrivateBonus() {
  const [activeTab, setActiveTab] = useState<"latest" | "archived">("latest");

  return (
    <div className="w-full mx-auto md:px-2 py-8 space-y-2 text-white">
      <h1 className="text-2xl font-medium ml-2 md:ml-5">Bonus</h1>
      <PromotionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PromotionGrid activeTab={activeTab} />
    </div>
  );
}

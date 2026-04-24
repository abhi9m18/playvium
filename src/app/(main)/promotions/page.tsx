"use client";

import { useState } from "react";
import { MixedContentWrapper } from "@/components/MixedContentWrapper";
import HeroSection from "./components/hero-section";
import PromotionGrid from "./components/promotion-grid";
import PromotionTabs from "./components/promotion-tabs";

export default function PromotionsPage() {
  return (
    <MixedContentWrapper
      publicContent={<PublicPromotions />}
      privateContent={<PrivatePromotions />}
    />
  );
}

/* ===================== PUBLIC (BEFORE LOGIN) ===================== */

function PublicPromotions() {
  const [activeTab, setActiveTab] = useState<"latest" | "archived">("latest");

  return (
    <main className="min-h-screen text-white space-y-4">
      <HeroSection />

      <PromotionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PromotionGrid activeTab={activeTab} />
    </main>
  );
}

/* ===================== PRIVATE (AFTER LOGIN) ===================== */

function PrivatePromotions() {
  const [activeTab, setActiveTab] = useState<"latest" | "archived">("latest");

  return (
    <main className="min-h-screen text-white space-y-2 px-2 md:px-6">
      <HeroSection />
      {/* <DepositCarousel /> */}

      <PromotionTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <PromotionGrid activeTab={activeTab} />
    </main>
  );
}

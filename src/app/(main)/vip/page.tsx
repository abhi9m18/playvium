"use client";

import FAQComponent from "@/components/home/faq";
import { FeatureCards } from "./components/feature-cards";
import { VIPCardTop } from "./components/vip-card-top";
import { VIPTiersTable } from "./components/vip-tiers-table";
import { MixedContentWrapper } from "@/components/MixedContentWrapper";
import VipBanner from "./components/vipbanner";

export default function page() {
  return (
    <MixedContentWrapper
      publicContent={<PublicVip />}
      privateContent={<PrivateVip />}
    />
  );
}
function PublicVip() {
  return (
    <div className="w-full mx-auto md:ml-2  py-2 space-y-4">
      {/* Top Card */}
      <VipBanner />

      {/* Feature Cards */}
      <FeatureCards />

      <div className="-m-4 sm:-m-8">
        <FAQComponent />
      </div>
    </div>
  );
}
function PrivateVip() {
  return (
    <div className="w-full mx-auto md:px-4 py-12 space-y-12 ">
      {/* Top Card */}
      <VIPCardTop />

      {/* Tiers Table */}
      <VIPTiersTable />

      {/* Feature Cards */}
      <FeatureCards />

      <div className="-m-4 sm:-m-8">
        <FAQComponent />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import {
  subscriptionTiers,
  subscriptionFeatures,
} from "@/data/subscriptionData";
import { MixedContentWrapper } from "@/components/MixedContentWrapper";
import { useAuthModal } from "@/store/auth-modal-store";

export default function SubscriptionTiersPage() {
  return (
    <MixedContentWrapper
      publicContent={<PublicSubscriptionPage />}
      privateContent={<PrivateSubscriptionPage />}
    />
  );
}

/* ================= PRIVATE ================= */

function PrivateSubscriptionPage() {
  return (
    <div className="w-full bg-[#15181E] mt-[66px]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-6 text-white flex flex-col">
        {/* TITLE */}
        <h2 className="ml-2 md:ml-6 mb-4 text-xl font-[Inter] font-medium">
          Subscription Tiers
        </h2>

        <SubscriptionTable />
      </div>
    </div>
  );
}

/* ================= PUBLIC ================= */

function PublicSubscriptionPage() {
  const { openModal } = useAuthModal();

  return (
    <div className="w-full bg-[#15181E] mt-[66px] min-h-[calc(100vh-66px)]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-2 text-white flex flex-col">
        {/* TITLE */}
        <h2 className="ml-2 md:ml-6 mb-4 text-xl font-[Inter] font-medium">
          Subscription Tiers
        </h2>

        <SubscriptionTable onAction={openModal} />
      </div>
    </div>
  );
}

/* ================= TABLE (REUSED) ================= */

function SubscriptionTable({
  onAction,
}: {
  onAction?: () => void;
}) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl bg-[#13181E] shadow-xl flex-1 flex flex-col">
      <div className="grid min-w-[900px] grid-cols-[2.5fr_1fr_1fr_1fr] w-full border border-[#222830] rounded-xl">
        {/* LEFT HEADER */}
        <div className="bg-[#1d232b] rounded-tl-2xl flex justify-center items-end px-4 py-3 border-r border-[#222830] text-xl font-normal">
          Feature
        </div>

        {/* TIER HEADERS */}
        {subscriptionTiers.map((tier, idx) => (
          <div
            key={tier.id}
            className={`flex flex-col bg-[#1d232b] justify-center items-center px-4 pt-2 border-r border-[#222830]
            ${idx === 2 ? "rounded-tr-2xl" : ""}`}
          >
            <span className="text-sm text-gray-400 mb-1">{tier.name}</span>
            <Image
              src={tier.image}
              alt={tier.name}
              width={90}
              height={90}
              className="object-contain mt-1"
            />
          </div>
        ))}

        {/* FEATURES */}
        {subscriptionFeatures.map((row, idx) => (
          <div key={idx} className="contents border-t border-[#222830]">
            <div className="px-4 py-2 pl-5 border-r border-[#222830] text-[16px] leading-snug">
              {row.name}
            </div>

            {row.icons.map((icon, i) => (
              <div
                key={i}
                className="flex justify-center items-center px-4 py-3 border-r border-[#222830]"
              >
                {icon ? (
                  <Image src={icon} alt="available" width={20} height={20} />
                ) : (
                  <span className="text-gray-500">-</span>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* EMPTY CELL */}
        <div className="border-r border-[#222830]" />

        {/* BUTTON ROW */}
        {subscriptionTiers.map((tier, idx) => (
          <div
            key={tier.id}
            className={`flex flex-col justify-end items-center border-r border-[#222830] pt-4 ${
              idx === 2 ? "rounded-br-2xl overflow-hidden" : ""
            }`}
            style={{ height: 120 }}
          >
            <span className="text-xl font-semibold">{tier.price}</span>

            {tier.perMonth && (
              <span className="text-gray-400 mb-1">{tier.perMonth}</span>
            )}

            <button
              onClick={onAction}
              className={`w-full py-4 text-xl font-bold font-[Inter] ${
                tier.id === 1
                  ? "bg-[#232931]"
                  : "bg-[#B146F5] hover:bg-[#C05CFF]"
              }`}
            >
              {tier.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

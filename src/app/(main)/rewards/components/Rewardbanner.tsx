"use client";

import Image from "next/image";
import { RewardBanner2 } from "@/assets/images/vip"; 
import { useAuthModal } from "@/store/auth-modal-store";

export default function BonusBanner() {
    const { openModal: openAuthModal } = useAuthModal();
  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-2xl
        md:bg-[linear-gradient(105deg,#0F141B_0%,#0F141B_55%,#CA9FF6_100%_100%)]
      "
    >
      {/* CONTENT WRAPPER */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          md:flex-row
          items-start
          md:items-center
          justify-between
          px-0
          md:pl-6
          pt-6
          md:py-0
          gap-2
          bg-[#0F141B]
        "
      >
        {/* LEFT CONTENT */}
        <div className="w-full md:max-w-[40%] pl-2">
          <h2 className="text-white text-[22px] md:text-[24px] font-medium md:font-bold leading-tight">
           Premium Rewards Await You
          </h2>

          <p className="mt-4 text-gray-400 text-[13px] md:text-[15px] leading-relaxed">
            Every play brings you closer to exciting rewards and bonuses. Keep
             playing and unlock more surprises along the way.
          </p>

          <button
          onClick={() => openAuthModal("register")}
            className="
              mt-3
              md:mt-6
              inline-flex
              items-center
              justify-center
              rounded-sm
              md:rounded-lg
              bg-[#b34ae9]
              px-18 
              md:px-22
              py-1.5
              md:py-2.5
              text-white
              font-medium
              md:font-semibold
              transition
              hover:brightness-110
              active:scale-[0.98]
            "
          >
            Sign Up
          </button>
        </div>

        {/* RIGHT IMAGE */}
<div
  className="
    relative
    mt-0
    w-full
    flex
    overflow-hidden
    items-center
    justify-center
    h-[280px]           
    md:h-[300px]
    md:w-[60%]
    md:justify-end   
    bg-[linear-gradient(180deg,#0F141B_30,#0F141B_40,#996EBE)]  
    md:bg-[linear-gradient(100deg,#0F141B,#0F141B_20%,#CA9FF6_100%)]
  "
>
  <Image
    src={RewardBanner2}
    alt="Bonuses"
    fill
    className="
      object-fit
      scale-[1]  
      pr-0
      md:pr-0
      md:pl-30
      md:scale-100
    "
    priority
  />
</div>

      </div>

      {/* SOFT OVERLAY (DEPTH) */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
    </div>
  );
}

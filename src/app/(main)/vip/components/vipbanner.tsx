"use client";

import Image from "next/image";
import { VipBanner2 } from "@/assets/images/vip"; 
import { useAuthModal } from "@/store/auth-modal-store";

export default function VipBanner() {
    const { openModal: openAuthModal } = useAuthModal();
  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-2xl
        md:bg-linear-to-r
        from-[#0f141b]
        via-[#171c26]
        to-[#5a2a1a]
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
          py-1
          md:py-0
          gap-2
        "
      >
        {/* LEFT CONTENT */}
        <div className="w-full md:max-w-[35%]">
          <h2 className="text-white text-xl md:text-3xl font-medium md:font-bold leading-tight">
            Unlock Your VIP Privileges
          </h2>

          <p className="mt-4 text-gray-400 text-xs md:text-base leading-relaxed">
            Join our VIP Club and enjoy a world of exclusive gifts, exciting giveaways, and premium features. Unlock higher cashback and elite rewards designed to elevate your experience.
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
              md:rounded-xl
              bg-[#b34ae9]
              px-18 
              md:px-8
              py-1.5
              md:py-3
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
    mt-3
    w-full
    flex
    overflow-hidden
    items-center
    justify-center
    h-[280px]           
    md:h-[300px]
    md:w-[65%]
    md:justify-end     
  "
>
  <Image
    src={VipBanner2}
    alt="Bonuses"
    fill
    className="
      object-fit
      scale-[2.4]  
      pr-24 
      md:pr-0 
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

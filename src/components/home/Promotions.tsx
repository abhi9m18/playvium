"use client";

import Image from "next/image";
import { useRef } from "react";

import { promotions } from "@/data/promotionsdata";
import {
  badge,
  promotionbg,
  promotionheading,
} from "@/assets/images/home/promotion";

export default function Promotions() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="px-2 sm:px-6 md:px-10">
      <section className="relative w-full rounded-2xl overflow-hidden my-6 shadow-xl">
        {/* Background */}
        <Image
          src={promotionbg}
          alt="promo bg"
          fill
          className="absolute inset-0 object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* MAIN FLEX — MOBILE AND DESKTOP */}
        <div className="relative z-10 p-4 sm:p-6 md:p-10 lg:p-10 max-w-7xl mx-auto">
          {/* FLEX: KEEP SIDE-BY-SIDE EVEN ON MOBILE */}
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full">
            {/* ========= LEFT CONTENT ========= */}
            <div
              className="
  flex flex-col 
  items-center md:items-center 
  justify-center 
  w-[60%] sm:w-[55%] 
  h-full
"
            >
              {/* Title Image */}
              <Image
                src={promotionheading}
                alt="PROMOTIONS"
                className="
      w-[180px] sm:w-[220px] md:w-[340px] lg:w-full
    "
              />

              {/* MOBILE TEXT (Short version) */}
              <p
                className="
      mt-2 text-center md:hidden 
      text-[12px] font-[600] leading-snug
    "
                style={{
                  color: "#F4FFFB",
                  WebkitTextStrokeWidth: "0.4px",
                  WebkitTextStrokeColor: "#4E0255",
                  fontFamily: "Rubik",
                }}
              >
                Corem ipsum dolor amet, <br />
                adipiscing elitlibero.
              </p>

              {/* DESKTOP/TABLET TEXT (Full version, 2 lines) */}
              <p
                className="
      hidden md:block 
      mt-3  
      text-[18px] lg:text-[20px] 
      font-[600] 
      leading-snug text-center
      max-w-md
    "
                style={{
                  color: "#F4FFFB",
                  WebkitTextStrokeWidth: "0.4px",
                  WebkitTextStrokeColor: "#4E0255",
                  fontFamily: "Rubik",
                }}
              >
                Corem ipsum dolor sit amet, consectetur <br />
                adipiscing elitlibero.
              </p>
            </div>

            {/* ========= RIGHT SCROLLER ========= */}
            <div className="w-[40%] sm:w-[40%] relative overflow-hidden">
              <div
                ref={scrollRef}
                className="flex gap-2 sm:gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x pt-1 pb-2"
              >
                {promotions.map((promo) => (
                  <div
                    key={promo.id}
                    className={`relative bg-linear-to-b ${promo.bgColor} w-[105px] sm:w-[135px] md:w-[150px] lg:w-[155px] shrink-0 rounded-xl shadow-md p-3 snap-start transition-transform hover:scale-[1.05]`}
                  >
                    <div className="absolute top-2 left-2 w-7 h-7 sm:w-9 sm:h-9">
                      <Image
                        src={badge}
                        alt="badge"
                        className="w-full h-full"
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
                        {promo.id < 10 ? `0${promo.id}` : promo.id}
                      </span>
                    </div>

                    <div className="flex justify-center mt-2 mb-0">
                      <Image
                        src={promo.image}
                        alt="bonus"
                        className="w-[80%] sm:w-[85%] md:w-full h-auto"
                      />
                    </div>

                    <h3 className="text-white font-semibold text-center text-[11px] sm:text-sm mb-2 leading-tight">
                      {promo.title}
                    </h3>

                    <button className="w-full py-1.5 sm:py-2 bg-white rounded-lg text-black text-[10px] sm:text-xs font-semibold shadow hover:bg-gray-200 active:scale-95">
                      {promo.depositText}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

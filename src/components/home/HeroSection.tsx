"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  herocasino,
  herosports,
  herodragon,
  herosportsmobile,
  slotherobanner,
  pokerherobanner,
  liveherobanner,
  fishingherobanner,
} from "@/assets/images/home";
import { banners } from "@/data/herobannerdata";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/store/auth-modal-store";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  // const { openModal } = useAuthModal();

  const { openModal: openAuthModal } = useAuthModal();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, banners.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };
  const handleBannerAction = (banner: any) => {
    if (banner.title === "Stay Untamed") {
      if (isAuthenticated === "authenticated") {
        router.push("/bonus");
      } else {
        openAuthModal();
      }
      return;
    }

    if (banner.title === "Invite Friends") {
      if (isAuthenticated === "authenticated") {
        router.push("/referral");
      } else {
        openAuthModal();
      }
      return;
    }

    if (banner.action) {
      switch (banner.action.type) {
        case "OPEN_AUTH_MODAL":
          openAuthModal();
          return;

        case "OPEN_REFERRAL":
          router.push("/referral");
          return;

        case "DOWNLOAD_APP":
          toast.success("This feature is coming soon!");
          return;

        case "CLAIM_BONUS":
          console.log("Claim Bonus", banner.action.payload);
          return;
      }
    }
    if (banner.link) {
      router.push(banner.link);
    }
  };

  return (
    <div className="w-full md:px-0">
      {/* Main Hero Banner */}
      <div className="relative w-full h-60 sm:h-[420px] md:h-[300px] lg:h-80 overflow-hidden">
        {/* Purple Gradient Overlay */}
        <div className="absolute inset-0 w-full md:w-3/4 bg-linear-to-b from-[#191d24] to-transparent z-1"></div>

        {/* Hero Dragon Image - Center */}
        <div className="hidden absolute inset-0 md:flex items-center justify-center z-5 pointer-events-none">
          <Image
            src={herodragon}
            alt="Hero Dragon"
            className="h-[55%] w-auto sm:h-[50%] object-contain"
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="w-full px-4 sm:px-6 md:px-10 lg:px-14 max-w-7xl mx-auto">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Image */}
                <div
                  className="absolute right-0 top-0 h-full 
     w-[80%] sm:w-[40%] md:w-[45%] lg:w-[55%] xl:w-[55%]"
                >
                  <Image
                    src={banner.backgroundImage}
                    alt={banner.title}
                    className="w-full h-full object-cover md:object-fill"
                    priority
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="relative z-10 space-y-2 pt-8 sm:pt-12 px-3 sm:px-6 md:px-10 lg:px-14">
                  {/* TITLE */}
                  <h1 className="text-white font-bold leading-[1.1] text-[20px] sm:text-[40px] md:text-[45px]">
                    {banner.title}

                    {banner.subtitle && !banner.oneline && (
                      <span className="block text-white text-[25px] sm:text-[45px] md:text-[45px] mt-1">
                        {banner.subtitle}
                      </span>
                    )}

                    {banner.oneline && (
                      <span className="block text-white text-[20px] sm:text-[30px] md:text-[30px] mt-2 font-normal">
                        {banner.oneline}
                      </span>
                    )}
                  </h1>

                  {/* AMOUNT ROW */}
                  {(banner.amount || banner.amountSuffix) && (
                    <div className="flex flex-col sm:flex-row md:items-baseline gap-0 sm:gap-2 mt-1">
                      {/* AMOUNT */}
                      {banner.amount && (
                        <span className="text-[#CA6BEF] font-medium md:font-semibold text-[20px] sm:text-[30px] leading-none">
                          {banner.amount}
                        </span>
                      )}

                      {/* SUFFIX */}
                      {banner.amountSuffix && (
                        <span className="text-white text-[14px] sm:text-[28px] leading-none block mt-2 mb-2 md:mb-0 md:mt-0 sm:inline">
                          {banner.amountSuffix}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA BUTTON */}
                  <button
                    onClick={() => handleBannerAction(banner)}
                    className="w-[130px] sm:w-[180px] h-[45px] sm:h-[55px] border-2 md:border border-white/40 rounded-xl bg-[#B93DEB] md:bg-[#212730] text-white text-[16px] sm:text-[18px] flex items-center justify-center md:mt-5 shadow-[0_0_20px_rgba(31,37,46,0.4)] transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 md:bottom-2 left-15 md:left-40 -translate-x-1/2 flex gap-1 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`rounded-full transition-all ${
                  index === currentSlide
                    ? "w-10 h-2 bg-[#b13fdf]"
                    : "w-2 h-2 bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className=" relative md:bottom-5 md:py-2 left-0 grid grid-cols-1 md:grid-cols-2 px-2 md:px-10 md:mx-auto gap-0 md:gap-4 ">
        <Link
          href="/livedealers"
          className="group relative block rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="relative w-full h-[120px] md:h-auto aspect-[2.2/1] md:aspect-[2.2/1]">
            <Image
              src={herocasino}
              alt="Casino"
              fill
              className="object-cover md:object-fill"
              priority
            />
          </div>
        </Link>

        {/* Sportsbook Card */}
        <Link
          href="/rewards"
          className="group relative block rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="relative w-full h-[125px] md:h-auto aspect-[2.2/1] md:aspect-[2.2/1]">
            <Image
              src={herosportsmobile}
              alt="Sportsbook"
              fill
              className="object-cover md:object-fill"
              priority
            />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 py-2 md:py-0 px-2 md:px-10 md:pb-5">
        <Link
          href="/slots"
          className="rounded-2xl md:rounded-3xl overflow-hidden 
               transition-transform duration-300 hover:scale-[1.04]"
        >
          <Image
            src={slotherobanner}
            alt="Slot"
            className="w-full h-[100px] md:h-40 object-cover md:object-fill"
            priority
          />
        </Link>

        <Link
          href="/tablegames"
          className="rounded-2xl md:rounded-3xl overflow-hidden 
               transition-transform duration-300 hover:scale-[1.04]"
        >
          <Image
            src={pokerherobanner}
            alt="Poker"
            className="w-full h-[100px] md:h-40 object-cover md:object-fill"
            priority
          />
        </Link>

        <Link
          href="/livedealers"
          className="rounded-2xl md:rounded-3xl overflow-hidden 
               transition-transform duration-300 hover:scale-[1.04]"
        >
          <Image
            src={liveherobanner}
            alt="Live Dealer"
            className="w-full h-[100px] md:h-40 object-cover md:object-fill"
            priority
          />
        </Link>

        <Link
          href="/fishing"
          className="rounded-2xl md:rounded-3xl overflow-hidden 
               transition-transform duration-300 hover:scale-[1.04]"
        >
          <Image
            src={fishingherobanner}
            alt="Fishing"
            className="w-full h-[100px] md:h-40 object-cover md:object-fill"
            priority
          />
        </Link>
      </div>
    </div>
  );
}

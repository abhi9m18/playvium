"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Info } from "lucide-react";
import {
  herobannerl,
  mobileherobanner,
  card1,
  card2,
  card3,
  card4,
  joinwatchlist,
} from "@/assets/landing";
import Link from "next/link";
import { globe, logo } from "@/assets/images/home";
import LanguageModal from "@/components/model/LanguageModal";
import WaitlistModal from "../models/WaitlistModal";

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 7,
    minutes: 53,
    seconds: 57,
  });

  const [showBonusModal, setShowBonusModal] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function FlipDigit({ value }: { value: number }) {
    return (
      <div className="relative w-8 h-15  md:w-[38px] md:h-16 rounded-lg overflow-hidden border-2  border-[#9498A6] shadow-inner">
        {/* TOP 50% */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-[#898F9A] to-[#898F9A]" />

        {/* BOTTOM 50% */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-b from-[#636A7A] to-[#636A7A]" />

        {/* DIGIT */}
        <div className="absolute inset-0 flex items-center px-2 justify-center">
          <span className="text-white text-center font-inter text-[34px] md:text-[42px] font-semibold leading-none tracking-[-1px]">
            {value}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image - Desktop */}
      <div className="fixed w-full z-999 bg-[#191d24]">
        <LanguageModal
          isOpen={isLanguageOpen}
          onClose={() => setIsLanguageOpen(false)}
        />
      </div>
      <div className="absolute  w-[1550px] max-w-screen mx-auto inset-0 z-0">
        <Image
          src={herobannerl}
          alt="Hero Background"
          fill
          className="object-cover w-[50%] object-center"
          priority
        />
      </div>

      {/* Background Image - Mobile */}
      <div className="md:hidden absolute inset-0">
        <Image
          src={mobileherobanner}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/70" /> */}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-2 md:px-18 pt-20 pb-10 md:py-24">
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="flex-1 md:w-[60%] ">
            {/* Coming Soon Badge */}
            <div className="mb-1">
              <div className="inline-block text-center md:text-left w-full md:w-auto">
                <p className="
                  text-white
                  font-inter
                  text-[22px]
                  md:text-[26px]
                  font-bold
                  leading-8
                  md:leading-12
                  uppercase
                  [text-shadow:0_0_26px_#ffffff]"
                >
                  Coming Soon
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="mb-6 md:mb-8 flex justify-left">
              <div
                className="mx-auto md:mx-0 w-auto  md:w-auto max-w-full
      inline-flex flex-wrap md:flex-nowrap 
      items-center justify-center 
      gap-x-0 md:gap-x-3 gap-y-1 md:gap-y-2
      bg-[#384252]/80 backdrop-blur-sm
      rounded-sm
      md:rounded-xl
      px-1 py-2 md:px-4 md:py-2
      border border-white/10
      
    "
              >
                {/* DAYS */}
                <div className="flex items-center gap-2">
                  <span className="text-white text-[13px] md:text-lg font-normal">
                    Days
                  </span>
                  <div className="flex gap-0.5 md:gap-1">
                    <FlipDigit value={Math.floor(timeLeft.days / 10)} />
                    <FlipDigit value={timeLeft.days % 10} />
                  </div>
                </div>

                <span className=" text-[#D1D3D4] px-0.5 text-2xl md:text-3xl font-bold pb-2">
                  :
                </span>

                {/* HOURS */}
                <div className="flex gap-1 md:gap-1">
                  <FlipDigit value={Math.floor(timeLeft.hours / 10)} />
                  <FlipDigit value={timeLeft.hours % 10} />
                </div>

                <span className=" text-[#D1D3D4] px-0.5 text-2xl md:text-3xl font-bold pb-2">
                  :
                </span>

                {/* MINUTES */}
                <div className="flex gap-1 md:gap-1">
                  <FlipDigit value={Math.floor(timeLeft.minutes / 10)} />
                  <FlipDigit value={timeLeft.minutes % 10} />
                </div>

                <span className=" text-[#D1D3D4] px-0.5 text-2xl md:text-3xl font-bold pb-2">
                  :
                </span>

                {/* SECONDS */}
                <div className="flex gap-1 md:gap-1">
                  <FlipDigit value={Math.floor(timeLeft.seconds / 10)} />
                  <FlipDigit value={timeLeft.seconds % 10} />
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-white font-inter text-center md:text-left text-[32px] md:text-[46px] font-extrabold leading-10 md:leading-[52px] uppercase text-shadow-[0_0_35px_#ffffff] mb-4 md:mb-4">
              WHY PLAY WITH US?
            </h1>

            {/* Description */}
            <p className="text-white font-inter text-center md:text-left text-[15px] md:text-[16px] font-light leading-[26px] md:leading-[30px] mb-2 md:mb-4 max-w-xl">
              Experience a new evolved way to play slot games with Playvium
              Sweepstakes' exciting, rewarding SweepStakes-style games.
            </p>

            <p className="text-white font-inter text-center md:text-left text-[18px] font-semibold leading-8 mb-6 md:mb-6 max-w-xl">
              Play anytime, anywhere — players love it, and we're sure you will
              too!
            </p>

            {/* Join Waitlist Button */}
            <div className="relative inline-flex items-center gap-3 mb-8 md:mb-0 justify-center md:justify-start w-full">
  <Button
    onClick={() => setOpen(true)}
    className="bg-[#B93DEB] /90 text-white text-base md:text-lg font-semibold px-28 md:px-18 py-5 md:py-6 rounded-lg shadow-xl transition-all hover:scale-105"
  >
    Join Waitlist
  </Button>

  <button
    onClick={() => setShowBonusModal(!showBonusModal)}
    className="flex items-center justify-center transition-all hover:scale-105"
  >
    <Image
      src={joinwatchlist}
      width={24}
      height={24}
      alt="Bonus Info"
      className="transition hover:brightness-125"
    />
  </button>

  {/* Bonus Info Modal */}
  {showBonusModal && (
    <div className="absolute top-14 md:top-0 right-1 md:left-[300px] w-72 md:w-80 bg-[#1a222d] backdrop-blur-md rounded-xl p-4 shadow-2xl border border-[#5B6B86] z-50">
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0" />
          <p className="text-white font-medium">100% deposit bonus</p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0" />
          <p className="text-white">
            <span className="font-medium">10 raffle tickets</span>
            <span className="text-white/70 text-sm ml-1">
              to win a GTR race car
            </span>
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-white mt-2 shrink-0" />
          <p className="text-white">
            <span className="font-medium">50 of free play</span>
            <span className="text-white/70 text-sm ml-1">
              on selective slot games
            </span>
          </p>
        </div>
      </div>
    </div>
  )}
</div>

          </div>

          {/* Right Column - Feature Cards Grid (Desktop Only) */}
          <div className="hidden sm:grid md:grid-cols-2 gap-4 lg:gap-5 md:w-[35%]">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] group">
              <Image
                src={card1}
                alt="Faster Redeem"
                width={260}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] group">
              <Image
                src={card2}
                alt="Exclusive games"
                width={260}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] group">
              <Image
                src={card3}
                alt="24/7 Customer Service"
                width={260}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10 hover:border-white/30 transition-all hover:scale-[1.02] group">
              <Image
                src={card4}
                alt="No purchases Necessary"
                width={260}
                height={280}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile Feature Cards (Below Content) */}
        <div className="md:hidden grid grid-cols-2 gap-3 mt-2">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={card1}
              alt="Faster Redeem"
              width={200}
              height={220}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={card2}
              alt="Exclusive games"
              width={200}
              height={220}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={card3}
              alt="24/7 Customer Service"
              width={200}
              height={220}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <Image
              src={card4}
              alt="No purchases Necessary"
              width={200}
              height={220}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <WaitlistModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

"use client";

import { mobilespincardbg, spincard, spincardbg } from "@/assets/landing";
import Image from "next/image";

export default function LandingSpincardsection({
  bgImage = spincardbg,
  characterImage = spincard,
}) {
  return (
    <div className="relative w-full md:max-w-6xl mx-auto rounded-xl overflow-hidden">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt="Banner Background"
        fill
        priority
        className="object-cover object-[70%_center] md:object-right"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 rounded-xl
  bg-[linear-gradient(140deg,#242B35_0%,#242B35_30%,#242B3500_60%)]
  md:bg-[linear-gradient(140deg,#242B35_0%,#242B35_40%,#242B3500_60%)]"
      />

      {/* Content */}
      <div className="relative z-10  flex flex-col md:flex-row items-center md:items-stretch justify-between px-0 md:px-12 py-16 md:pt-0 gap-8">
        {/* Left Content */}
        <div className="flex flex-col justify-center max-w-xl text-center md:text-left">
          <h1 className="text-white text-2xl md:text-4xl font-semibold leading-tight">
            Spin Boldly, Win Massively
          </h1>

          <p className="mt-3 text-gray-300 text-sm md:text-base">
            NO PURCHASE NEEDED, win big anytime.
          </p>

          <button className="mt-6 w-[70%] mx-auto md:mx-0 md:w-fit md:px-12 py-2.5 rounded-lg bg-[#B84AF3] hover:bg-[#a23be0] transition text-white font-semibold text-base">
            Play For Free
          </button>
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-[500px] pt-12 md:pt-8 h-[200px] md:h-[260px] ">
          <Image
            src={characterImage}
            alt="Banner Character"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}

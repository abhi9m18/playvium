"use client";

import Image from "next/image";
import {
  dailyReward,
  newGames,
  support24,
} from "@/assets/landing";

export default function LandingFeatures() {
  const features = [
    {
      title: "Daily Reward",
      description: "Collect Free Coins Every Day — Just Log In!",
      image: dailyReward,
    },
    {
      title: "New Games, Every Week!",
      description:
        "Nonstop action and fresh excitement! Play new casino games released weekly.",
      image: newGames,
    },
    {
      title: "24/7 Customer Support",
      description:
        "We're Here for You! Fast, friendly support whenever you need it.",
      image: support24,
    },
  ];

  return (
    <section className="w-full px-3 md:px-8 py-10 md:py-16">
      <div className="max-w-6xl  mx-auto">
        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
  {features.map((item, index) => {
    const isNewGames = item.title === "New Games, Every Week!";

    return (
      <div
        key={index}
        className="
          flex-1
          overflow-hidden
          rounded-2xl
          bg-[#1E242E]
          px-6 pt-6
          flex flex-col
          items-center
          text-center
          hover:scale-[1.02]
          transition-transform
        "
      >
        {/* Text */}
        <h3 className="text-white text-lg md:text-xl font-semibold">
          {item.title}
        </h3>

        <p className="mt-2 text-white/60 text-sm md:text-[15px] max-w-[260px]">
          {item.description}
        </p>

        {/* Image — ALWAYS BOTTOM */}
        <div
          className={`relative w-full h-[200px] md:h-[200px] mt-auto ${
            isNewGames ? "pb-4 md:pb-6" : ""
          }`}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
}

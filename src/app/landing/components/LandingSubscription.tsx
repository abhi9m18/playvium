"use client";

import { basic, hustler, player } from "@/assets/landing";
import Image from "next/image";

export default function LandingSubscription() {
  const tiers = [
    {
      title: "Basic",
      price: "Free",
      image: basic
    },
    {
      title: "Player",
      price: "10 per month",
      image: player,
    },
    {
      title: "Hustler",
      price: "50 per month",
      image: hustler,
    },
  ];

  return (
    <section className="w-full py-8 md:py-16 px-2">
      {/* Heading */}
      <div className="text-center mb-4 md:mb-12">
        <h2 className="text-white text-xl md:text-3xl font-bold mb-2">
          Subscription Tiers
        </h2>
        <p className="text-white/60 text-[12px] md:text-[15px]">
          Unlock exclusive rewards and benefits with our subscription tiers
        </p>
      </div>

      {/* Cards Grid */}
      <div
        className="
          max-w-6xl mx-auto
          grid grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-3 md:gap-6
          place-items-center
        "
      >
        {tiers.map((tier, index) => (
          <div
            key={index}
            className={`
              w-full max-w-[500px] md:max-w-[320px]
              rounded-2xl
              overflow-hidden
              transition-transform duration-300
              hover:scale-[1.03]
              ${
                index === 2
                  ? "sm:col-span-2 sm:justify-self-center lg:col-span-1"
                  : ""
              }
            `}
          >
            {/* Image */}
            <div className="relative w-full h-[450px] md:h-[360px]">
              <Image
                src={tier.image}
                alt={tier.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            
          </div>
        ))}
      </div>
    </section>
  );
}

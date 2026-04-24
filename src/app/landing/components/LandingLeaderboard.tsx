"use client";

import { useState } from "react";
import {
  hustler1,
  hustler2,
  hustler3,
  hustler4,
  hustler5,
  hustler6,
  leaderboard1,
  leaderboard2,
  leaderboard3,
  leaderboard4,
  leaderboard5,
  leaderboard6,
  leaderboard7,
  leaderboard8,
  leaderboardbanner,
} from "@/assets/landing";
import Image from "next/image";

export default function LandingLeaderboard() {
  const [showAll, setShowAll] = useState(false);

  const playerImages = [leaderboard5, leaderboard6, leaderboard4];
  const totalPlayers = 15;
  const displayedPlayers = showAll ? totalPlayers : 10;

  return (
    <section className="w-full py-4 md:py-8 px-0 md:px-6 ">
      <h2 className="text-center text-white text-xl md:text-3xl font-bold py-0 md:py-8 md:pb-4">
        Leaderboard
      </h2>

      <div className="max-w-6xl mx-auto rounded-t-2xl overflow-hidden  relative">
        <div className="relative z-10 mt-4 md:mt-40">
          {/* ================= CARDS (ABOVE BANNER) ================= */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 pt-28 gap-12 px-4 md:px-8 mb-0 md:mb-0"
            style={{
              backgroundImage: `
              linear-gradient(
                180deg,
                #181B2008 0%,
                rgba(36,43,53,0.9) 55%,
                rgba(36,43,53,1) 100%
              ),
              url(${leaderboardbanner.src})
            `,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
              backgroundSize: "130% auto",
            }}
          >
            {/* LEFT CARD */}
            <div className="relative p-4 md:p-6 pt-30 md:pt-16">
              <div className="absolute -top-10 md:-top-50 left-1/2 -translate-x-1/2 md:left-15 md:translate-x-0">
                <Image src={leaderboard1} alt="" width={220} height={220} />
                <Image src={leaderboard7} alt="" width={220} height={220} />
              </div>

              <h3 className="text-white font-bold text-sm md:text-3xl mt-12 md:-mt-5 text-center md:text-left">
                Free <span className="text-[#B93DEB]">Hustler</span> tier for 1
                month
              </h3>
              <p className="text-white/60 text-xs md:text-base mt-1 text-center md:text-left">
                Top 10 players will receive
              </p>

              <ul className="mt-3 space-y-1.5 text-center md:text-left text-xs md:text-base text-white">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler1}
                    alt="Concierge Priority Access"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Concierge Priority Access</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler2}
                    alt="Weekly Free Spins"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Weekly Free Spins</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler3}
                    alt="Profile Customization"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Profile Customization</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler4}
                    alt="Tier Badge"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Emblem / Badge for Tier</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler5}
                    alt="Increased Rewards"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Increased Rewards</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler6}
                    alt="Raffle Entry"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Free Entry to Raffle</span>
                </li>
              </ul>
            </div>

            {/* RIGHT CARD */}
            <div className="relative p-4 md:p-6 pt-30 md:pt-16">
              <div className="absolute -top-10 md:-top-50 left-1/2 -translate-x-1/2 md:left-15 md:translate-x-0">
                <Image src={leaderboard2} alt="" width={220} height={220} />
                <Image src={leaderboard7} alt="" width={220} height={220} />
              </div>

              <h3 className="text-white font-bold text-sm md:text-3xl mt-12 md:-mt-5 text-center md:text-left">
                Free <span className="text-[#B93DEB]">Player</span> tier for 1
                month
              </h3>
              <p className="text-white/60 text-xs md:text-base mt-1 text-center md:text-left">
                Top 50 players will receive
              </p>

              <ul className="mt-3 space-y-1.5  text-center md:text-left text-xs md:text-base text-white">
                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler1}
                    alt="Concierge Priority Access"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Concierge Priority Access</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler2}
                    alt="Weekly Free Spins"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Weekly Free Spins</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler3}
                    alt="Profile Customization"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Profile Customization</span>
                </li>

                <li className="flex items-center justify-center md:justify-start gap-2">
                  <Image
                    src={hustler4}
                    alt="Tier Badge"
                    width={18}
                    height={18}
                    className="shrink-0"
                  />
                  <span>Emblem / Badge for Tier</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= BANNER + TABLE HEADER ================= */}
          <div className="relative w-full bg-[#242B35]">
            <div>
              <Image
                src={leaderboard8}
                alt="Hustler"
                className="drop-shadow-2xl "
              />
            </div>

            <div className="relative z-10 grid grid-cols-3 text-white border-b border-white/10 py-4 px-4 md:px-72">
              <div className="text-xs md:text-base">Ranks</div>
              <div className="text-xs md:text-base">Player Name</div>
              <div className="text-xs md:text-base text-center">
                Joined Player
              </div>
            </div>
          </div>

          {/* ================= TABLE BODY ================= */}
          <div>
            {Array.from({ length: displayedPlayers }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-3 bg-[#191D24] border-b border-white/5 py-2 md:py-3 px-6 md:px-72"
              >
                <div className="text-white/90 text-xs md:text-base font-semibold">
                  #{i + 1}
                </div>

                <div className="flex items-center gap-2">
                  <Image src={leaderboard3} alt="" width={32} height={32} />
                  <span className="text-white/90 text-xs md:text-base">
                    J**n
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <div className="flex -space-x-2">
                    {playerImages.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt=""
                        width={38}
                        height={38}
                        className="rounded-full border-2 border-[#1a2029]"
                      />
                    ))}
                  </div>
                  <span className="text-white/90 text-xs md:text-base">25</span>
                </div>
              </div>
            ))}
          </div>

          {/* ================= VIEW MORE ================= */}
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full bg-linear-to-r rounded-b-2xl from-[#A23CEB] to-[#C158F3] hover:from-[#B14EFC] hover:to-[#D269FF] text-white font-semibold py-2 md:py-3 flex items-center justify-center gap-2"
          >
            {showAll ? "View Less" : "View More"}
            <svg
              width="18"
              height="18"
              viewBox="0 0 21 21"
              className={`transition-transform ${
                showAll ? "rotate-0" : "rotate-180"
              }`}
            >
              <path
                d="M4.00317 13.2503L10.8282 6.42529L17.6532 13.2503"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

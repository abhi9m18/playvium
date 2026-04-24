"use client";

import LandingFooter from "../components/LandingFooter";
import GamingHero from "./components/GamingHero";
import GamingTabs from "./components/GamingTabs";

export default function ResponsibleGamingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (<>
    <section className="bg-[#0f1318] min-h-screen text-white">
      <GamingHero />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Tabs */}
          <GamingTabs />

          {/* Route Content */}
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </section>
    <LandingFooter/>
    </>
  );
}

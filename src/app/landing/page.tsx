"use client";
import LandingFooter from "./components/LandingFooter";
import LandingGamesShowcase from "./components/LandingGamesShowcase";
import LandingHeader from "./components/LandingHeader";
import LandingHeroSection from "./components/LandingHeroseaction";
import LandingLeaderboard from "./components/LandingLeaderboard";
import LandingSubscription from "./components/LandingSubscription";
import LandingVIPTiersTable from "./components/LandingVIPTiersTable";
import LandingSpincardsection from "./components/LandingSpincardsection";
import LandingFeatures from "./components/LandingFeatures";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F131A]">
      <LandingHeader />
      <LandingHeroSection />
      <LandingSubscription />
      <LandingLeaderboard />
      <LandingSpincardsection />
      <LandingFeatures/>
      <LandingGamesShowcase />
      <LandingVIPTiersTable />
      <LandingFooter />
    </div>
  );
}

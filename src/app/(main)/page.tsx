"use client";

import HeroSection from "@/components/home/HeroSection";
import RecentBigWins from "@/components/home/RecentBigWins";
import Originals from "@/components/home/Originals";
import NewReleases from "@/components/home/NewReleases";
import Promotions from "@/components/home/Promotions";
import FeaturedGames from "@/components/home/FeaturedGames";
import FAQComponent from "@/components/home/faq";
import LatestBetAndRace from "@/components/home/bettable";
import { useProfileMenu } from "@/context/ProfileMenuContext";
import ProfileModal from "@/components/model/profile/profile-modal";

export default function HomePage() {
  const { profileOpen, setProfile } = useProfileMenu();

  return (
    <div className="flex flex-col max-w-7xl mx-auto pb-6">
      {profileOpen && (
        <ProfileModal onClose={() => setProfile(false)} />
      )}

      <HeroSection />
      <RecentBigWins />
      <Originals />
      <NewReleases />
      <FeaturedGames />
      <LatestBetAndRace />
      <Promotions />
      <FAQComponent />
    </div>
  );
}
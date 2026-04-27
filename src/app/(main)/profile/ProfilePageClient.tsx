"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import Sidebar from "@/components/profile/Sidebar";
import WalletRight from "@/components/profile/Wallet";
import BuyDiamond from "@/components/profile/BuyDiamond";
import Redeem from "@/components/profile/Redeem";
import WalletHistory from "@/components/profile/TransactionHistory";
import BetHistory from "@/components/profile/BetHistory";
import EditProfile from "@/components/profile/EditProfile";
import Rollover from "@/components/profile/RollOver";
import Referrals from "@/components/profile/Refferals";
import { useProfileMenu } from "@/context/ProfileMenuContext";
import MobileHeader from "@/components/profile/MobileHeader";
import Kyc from "@/components/profile/Kyc";

export default function ProfilePageClient() {
  const { activeMenu, setActiveMenu } = useProfileMenu();
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const isInitialized = useRef(false);

  // Sync URL -> global state on mount and param changes
  useEffect(() => {
    const tab = params.get("tab");
    const targetTab = tab || "wallet";
    
    // Prevent redirect loop - only set once on mount
    if (!isInitialized.current) {
      isInitialized.current = true;
      setActiveMenu(targetTab);
      
      // If no tab in URL, update URL without navigation
      if (!tab) {
        const newUrl = `${pathname}?tab=wallet`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      }
    } else if (tab && tab !== activeMenu) {
      // Only update if URL actually changed
      setActiveMenu(tab);
    }
  }, [params, pathname, activeMenu, setActiveMenu]);

  const changeTab = (tab: string) => {
    setActiveMenu(tab); // Global State Update
    router.replace(`/profile?tab=${tab}`, { scroll: false }); // Update URL without reload
  };

  const goBack = () => {
    changeTab("menu");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "wallet":
        return <WalletRight header={<MobileHeader title="Wallet" onBack={goBack} />} />;
      case "kyc":
        return <Kyc header={<MobileHeader title="KYC" onBack={goBack} />} />;
      case "buy":
        return <BuyDiamond header={<MobileHeader title="Buy Playvium Cash" onBack={goBack} />} />;
      case "redeem":
        return <Redeem header={<MobileHeader title="Redeem" onBack={goBack} />} />;
      case "history":
        return <WalletHistory header={<MobileHeader title="Transaction" onBack={goBack} />} />;
      case "rollover":
        return <Rollover header={<MobileHeader title="Roll Over" onBack={goBack} />} />;
      case "referrals":
        return <Referrals header={<MobileHeader title="Referrals" onBack={goBack} />} />;
      case "bet":
        return <BetHistory header={<MobileHeader title="Bet History" onBack={goBack} />} />;
      default:
        return null;
    }
  };

  return (
    <div className="text-white bg-[#060B1E] p-4 md:p-7 mt-12 min-h-screen">

      {/* MOBILE VIEW */}
      <div className="flex md:hidden">
        {activeMenu === "menu" ? (
          <Sidebar activeTab={activeMenu} onTabChange={changeTab} />
        ) : (
          <div className="w-full">{renderContent()}</div>
        )}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex gap-4">
        <Sidebar activeTab={activeMenu} onTabChange={changeTab} />

        <main className="flex-1">
          {/* No mobile header in desktop */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

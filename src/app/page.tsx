"use client";
import { useEffect, useState } from "react";
import { AppSidebar, MobileSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import HomePage from "./(main)/page";
import Footer from "@/components/layout/Footer";
import { useProfileMenu } from "@/context/ProfileMenuContext";
import { useAuthStore } from "@/store/auth-store";
import ProfileModal from "@/components/model/profile/profile-modal";

export default function Page() {
  const { isAuthenticated, isLoading } = useAuthStore((state) => state);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRecommendedWalletsModalActive, setIsRecommendedWalletsModalActive] =
    useState(false);
  const [footerContentModal, setFooterContentModal] = useState<string | null>(
    null
  );
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);
  const [isDepositModalActive, setIsDepositModalActive] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((s) => !s);



  return (
    <div className="min-h-screen flex flex-col bg-[#0F131A]">
      {/* Header */}
      <Header
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        status={isAuthenticated}
        session={null}
        setIsLoginModalActive={setIsLoginModalActive}
        setIsDepositModalActive={setIsDepositModalActive}
        setIsRedeemOpen={setIsRedeemOpen}
        unreadCount={3}
        state={{ currentPage: "Home", isSignUp: false }}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          {/* Desktop Sidebar */}
          <AppSidebar
            status={isAuthenticated}
            onToggleSidebar={toggleSidebar}
            unreadCount={3}
          />

          <MobileSidebar
            status={isAuthenticated}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          {/* Main Content */}
          <SidebarInset className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 mt-[60px] md:mt-[66px] lg:mt-[66px] bg-[#0F131A] overflow-y-auto lg:pb-0">
              <HomePage />
              <Footer
                setIsRecommendedWalletsModalActive={
                  setIsRecommendedWalletsModalActive
                } 
                setFooterContentModal={setFooterContentModal}
              />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
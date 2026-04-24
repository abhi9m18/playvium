"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AppSidebar, MobileSidebar } from "@/components/app-sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth-store";
import { getRouteConfig } from "@/config/routes";
import { SmartRouteGuard } from "@/components/guards/AuthGuards";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const routeConfig = getRouteConfig(pathname);
  
  // Desktop sidebar state (closed by default)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Mobile sidebar state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Other modal states
  const [isRecommendedWalletsModalActive, setIsRecommendedWalletsModalActive] =
    useState(false);
  const [footerContentModal, setFooterContentModal] = useState<string | null>(
    null
  );
  const [isLoginModalActive, setIsLoginModalActive] = useState(false);
  const [isDepositModalActive, setIsDepositModalActive] = useState(false);
  const [isRedeemOpen, setIsRedeemOpen] = useState(false);
  
  const { isAuthenticated } = useAuthStore((state) => state);
  
  // Determine what to show based on route config
  const showSidebar = routeConfig?.showSidebar ?? true;
  const showHeader = routeConfig?.showHeader ?? true;
  const showFooter = routeConfig?.showFooter ?? true;

  // Toggle Desktop Sidebar
  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  const [status, setStatus] = useState(isAuthenticated);

  useEffect(() => {
    setStatus(isAuthenticated);
  }, [isAuthenticated]);

  // Toggle Mobile Sidebar
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((s) => !s);

  // Layout without sidebar (e.g., login, landing pages)
  if (!showSidebar) {
    return (
      <SmartRouteGuard>
        <div className="min-h-screen flex flex-col bg-[#0d0f13]">
          {showHeader && (
            <Header
              onToggleSidebar={toggleSidebar}
              isSidebarOpen={false}
              status={status}
              session={null}
              setIsLoginModalActive={setIsLoginModalActive}
              setIsDepositModalActive={setIsDepositModalActive}
              setIsRedeemOpen={setIsRedeemOpen}
              unreadCount={0}
              state={{ currentPage: "Home", isSignUp: false }}
            />
          )}
          
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
          
          {showFooter && (
            <Footer
              setIsRecommendedWalletsModalActive={
                setIsRecommendedWalletsModalActive
              }
              setFooterContentModal={setFooterContentModal}
            />
          )}
        </div>
      </SmartRouteGuard>
    );
  }

  // Full layout with sidebar
  return (
    <SmartRouteGuard>
      <div className="min-h-screen flex flex-col bg-[#0d0f13]">
        {showHeader && (
          <Header
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            status={status}
            session={null}
            setIsLoginModalActive={setIsLoginModalActive}
            setIsDepositModalActive={setIsDepositModalActive}
            setIsRedeemOpen={setIsRedeemOpen}
            unreadCount={0}
            state={{ currentPage: "Home", isSignUp: false }}
          />
        )}
        
        <div className="flex flex-1 overflow-hidden">
          <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <AppSidebar onMobileMenuToggle={toggleMobileSidebar} />
            
            <SidebarInset className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-y-auto">
                {children}
                
                {showFooter && (
                  <Footer
                    setIsRecommendedWalletsModalActive={
                      setIsRecommendedWalletsModalActive
                    }
                    setFooterContentModal={setFooterContentModal}
                  />
                )}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>

      <MobileSidebar
        onMobileMenuToggle={toggleMobileSidebar}
        status={status}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

        <style jsx global>{`
          @media (max-width: 1023px) {
            body {
              padding-bottom: 64px;
            }
          }
        `}</style>
      </div>
    </SmartRouteGuard>
  );
}
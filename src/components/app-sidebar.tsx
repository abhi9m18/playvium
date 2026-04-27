"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

// Import icons
import {
  favorites,
  announcement,
  live,
  fishing,
  slots,
  recent,
  table,
  livedealers,
  vip,
  promo,
  faq,
  subscription,
  bonus,
  poker,
  reward,
  sidehustle,
  history,
  chat,
  sponsorships,
  hfavorites,
  hrecent,
  hsidehustle,
  hlivedealers,
  hslots,
  hannouncement,
  hbonus,
  hchat,
  hfaq,
  hfishing,
  hhistory,
  hlive,
  hpoker,
  hpromo,
  hreward,
  hsponsorships,
  hsubscription,
  htable,
  hvip,
  hlotteryIcon,
} from "@/assets/images/sidebar";

import {
  searchbb,
  chatbb,
  menubb,
  announcementbb,
  profilebb,
  lobbybb,
  Homebb,
  rewardsbb,
} from "@/assets/icons/bottombar";
import { cross, logo } from "@/assets/images/home";
import Link from "next/link";
import { lotteryIcon } from "@/assets/icons/lottery";
import { useAuthStore } from "@/store/auth-store";
import { useChatModal } from "@/store/chat-modal-store";
import { toast } from "react-hot-toast";

const sidebarGroups = [
  {
    items: [
      {
        name: "Favorites",
        icon: favorites,
        hicon: hfavorites,
        link: "/favorites",
        requireAuth: true,
      },
      {
        name: "Recent",
        icon: recent,
        hicon: hrecent,
        link: "/recent",
        requireAuth: true,
      },
      {
        name: "Side Hustle",
        icon: sidehustle,
        hicon: hsidehustle,
        link: "/sidehustle",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "Live Dealers",
        icon: livedealers,
        hicon: hlivedealers,
        link: "/livedealers",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "Slots",
        icon: slots,
        hicon: hslots,
        link: "/slots",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "Table Games",
        icon: table,
        hicon: htable,
        link: "/tablegames",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "Fishing",
        icon: fishing,
        hicon: hfishing,
        link: "/fishing",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "Poker",
        icon: poker,
        hicon: hpoker,
        link: "/poker",
        requireAuth: false,
      },
    ],
  },
  //  {
  //   items: [
  //     {
  //       name: "Lottery",
  //       icon: lotteryIcon,
  //       hicon: hlotteryIcon,
  //       link: "/lottery",
  //       requireAuth: false,
  //     },
  //   ],
  // },
  {
    items: [
      {
        name: "Promotions",
        icon: promo,
        hicon: hpromo,
        link: "/promotions",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "Sponsorships",
        icon: sponsorships,
        hicon: hsponsorships,
        link: "/sponsorships",
        requireAuth: false,
      },
    ],
  },
  {
    items: [
      {
        name: "VIP",
        icon: vip,
        hicon: hvip,
        link: "/vip",
        requireAuth: false,
      },
      {
        name: "Subscription Tiers",
        icon: subscription,
        hicon: hsubscription,
        link: "/subscription",
        requireAuth: false,
      },
      {
        name: "Bonus",
        icon: bonus,
        hicon: hbonus,
        link: "/bonus",
        requireAuth: false,
      },
      {
        name: "Rewards",
        icon: reward,
        hicon: hreward,
        link: "/rewards",
        requireAuth: false,
      },
      {
        name: "Announcement",
        icon: announcement,
        hicon: hannouncement,
        link: "/announcement",
        requireAuth: false,
      },
      {
        name: "FAQ",
        icon: faq,
        hicon: hfaq,
        link: "/faq",
        requireAuth: false,
      },
      {
        name: "History",
        icon: history,
        hicon: hhistory,
        link: "/mygameplay",
        requireAuth: true,
      },
      {
        name: "Live Support",
        icon: live,
        hicon: hlive,
        link: "/support",
        requireAuth: false,
        action: "toast",
      },
      {
        name: "Forum / Chat",
        icon: chat,
        hicon: hchat,
        link: "/chat",
        requireAuth: true,
        action: "openChatModal",
      },
    ],
  },
  // {
  //   items: [
  //     {
  //       name: "Live Support",
  //       icon: live,
  //       hicon: hlive,
  //       link: "/support",
  //       requireAuth: false,
  //     },
  //   ],
  // },
  // {
  //   items: [
  //     {
  //       name: "Forum / Chat",
  //       icon: chat,
  //       hicon: hchat,
  //       link: "/chat",
  //       requireAuth: true,
  //     },
  //   ],
  // },
];
export interface SidebarItem {
  name: string;
  icon: any;
  hicon: any;
  link: string;
  requireAuth: boolean;
  action?: string;
}

export interface SidebarGroup {
  items: SidebarItem[];
}
export const filterSidebarGroups = (
  sidebarGroups: SidebarGroup[],
  isAuthenticated: boolean
): SidebarGroup[] => {
  if (isAuthenticated) return sidebarGroups;

  return sidebarGroups
    .map(
      (group): SidebarGroup => ({
        ...group,
        items: group.items.filter((item): boolean => !item.requireAuth),
      })
    )
    .filter((group): boolean => group.items.length > 0);
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onMobileMenuToggle?: () => void;
  status?: string;
  onToggleSidebar?: () => void;
  unreadCount?: number;
}

export function AppSidebar({
  onMobileMenuToggle,
  onToggleSidebar,
  status,
  unreadCount = 3,
  ...props
}: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore((state) => state);
  status = isAuthenticated;
  
  
  useEffect(() => {
    if (!pathname) return;
    const page = pathname.split("/").filter(Boolean).pop() || "casino";
    setCurrentPage(page);
  }, [pathname]);
  
  const filteredSidebar = filterSidebarGroups(
    sidebarGroups,
    isAuthenticated === "authenticated"
  );

  const { openModal: openChatModal } = useChatModal();
  
  
  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar
        style={{
          ["--sidebar-width-icon" as any]: "72px",
        }}
        collapsible="icon"
        {...props}
        className="mt-14  border-none shadow-none bg-[#06162D] hidden lg:flex"
      >
        <SidebarContent className="px-3 py-3 md:pb-18 bg-[#06162D] gap-3 overflow-y-auto scrollbar-hide group-data-[collapsible=icon]:overflow-visible">
          {filteredSidebar.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex} className="h-auto overflow-visible">
              <SidebarGroupContent
                className={cn(
                  "border border-gray-700 transition-colors",
                  "bg-[#06162D] rounded-2xl p-0",
                  "group-data-[collapsible=icon]:bg-[#06162D]",
                  "group-data-[collapsible=icon]:p-2",
                  "group-data-[collapsible=icon]:rounded-2xl"
                )}
              >
                <SidebarMenu className="gap-1 group-data-[collapsible=icon]:pt-2 group-data-[collapsible=icon]:gap-2 group-data-[collapsible=icon]:overflow-visible">
                  {group.items.map((item) => {
                    const isActive = currentPage === item.link.replace("/", "");
                    const isHovered = hoveredItem === item.name;
                    
                    return (
                      <SidebarMenuItem
                        className="h-auto  group-data-[collapsible=icon]:overflow-visible"
                        key={item.name}
                      >
                        <SidebarMenuButton
                          // tooltip={item.name}
                          onMouseEnter={() => setHoveredItem(item.name)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => {
                            if (item.action === "openChatModal") {
                              openChatModal("chat");
                              return;
                            }
                            if (item.action === "toast") {
                              toast.success("This feature is coming soon!");
                              return;
                            }
                            if (item.link) {
                              router.push(item.link);
                              setCurrentPage(item.link.replace("/", ""));
                            }
                          }}
                          className={cn(
                            "w-full h-12 px-3 rounded-lg flex hover:text-[#ffffff] items-center justify-center gap-6 transition-all duration-200",
                            // Expanded sidebar styles
                            isActive
                              ? "text-white"
                              : "text-[#ffffff] hover:bg-transparent",
                            // Collapsed sidebar styles
                            "group-data-[collapsible=icon]:w-12",
                            "group-data-[collapsible=icon]:h-12",
                            "group-data-[collapsible=icon]:p-0",
                            "group-data-[collapsible=icon]:rounded-xl",
                            "group-data-[collapsible=icon]:flex",
                            "group-data-[collapsible=icon]:items-center",
                            "group-data-[collapsible=icon]:justify-center",
                            isActive
                              ? "group-data-[collapsible=icon]:bg-transparent"
                              : "group-data-[collapsible=icon]:hover:bg-transparent"
                          )}
                          style={isActive ? { background: "linear-gradient(90deg, #0D6BEF 0%, #6FFCF7 123.17%)" } : undefined}
                        >
                          <div className="flex gap-3 w-full items-center group-data-[collapsible=icon]:justify-center relative">
                            {/* Show hicon on hover or active, otherwise show normal icon */}
                            <div className="relative w-[22px] h-[22px] group-data-[collapsible=icon]:w-7 group-data-[collapsible=icon]:h-7">
                              <Image
                                src={isActive || isHovered ? item.hicon : item.icon}
                                alt={item.name}
                                width={26}
                                height={26}
                                className="transition-all duration-200 group-data-[collapsible=icon]:w-7 group-data-[collapsible=icon]:h-7"
                              />
                            </div>
                            <span className="text-[15px] font-medium truncate group-data-[collapsible=icon]:hidden">
                              {item.name}
                            </span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>

      {/* ===== MOBILE BOTTOM NAV — AUTHENTICATED ===== */}
      {status === "authenticated" && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#161B23] border-t border-[#262C36] z-[999] shadow-[0_-4px_20px_rgba(0,0,0,0.45)]">
          <div className="relative flex items-center justify-between px-6 h-[72px]">
            {/* Home */}
            <button
              onClick={() => router.push("/")}
              className="flex flex-col items-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
            >
              <Image src={Homebb} alt="Home" width={25} height={25} />
              <span className="text-[11px] font-medium">Home</span>
            </button>

            {/* Menu */}
            {pathname !== "/" ? (
              <button
                onClick={onMobileMenuToggle}
                className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
              >
                <Image src={menubb} alt="Menu" width={28} height={28} />
                <span className="text-[11px] font-medium">Menu</span>
              </button>
            ) : (
              <button
                onClick={onToggleSidebar}
                className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
              >
                <Image src={menubb} alt="Menu" width={28} height={28} />
                <span className="text-[11px] font-medium">Menu</span>
              </button>
            )}

            {/* Big Floating LOBBY */}
            <button
              onClick={() => router.push("/lobby")}
              className="absolute left-1/2 -translate-x-1/2 -top-5 w-[78px] h-[78px] rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 z-10"
            >
              <Image src={lobbybb} alt="Lobby" width={60} height={60} />
              <span className="text-[11px] font-medium text-white mt-1">
                Lobby
              </span>
            </button>

            {/* Spacer for centered lobby button */}
            <div className="w-[25px]"></div>

            {/* Rewards */}
            <button
              onClick={() => router.push("/rewards")}
              className="flex flex-col items-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
            >
              <Image src={rewardsbb} alt="Rewards" width={25} height={25} />
              <span className="text-[11px] font-medium">Rewards</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => router.push("/profile?tab=menu")}
              className="flex flex-col items-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
            >
              <Image
                src={profilebb}
                alt="Profile"
                width={35}
                height={35}
                className="rounded-full"
              />
              <span className="text-[11px] font-medium">Profile</span>
            </button>
          </div>
        </div>
      )}

      {/* ===== MOBILE BOTTOM NAV — UNAUTHENTICATED ===== */}
      {status !== "authenticated" && (
        <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#161B23] border-t border-[#262C36] z-[999] shadow-[0_-4px_20px_rgba(0,0,0,0.45)]">
          <div className="grid grid-cols-4 h-[70px]">
            {/* Search */}
            <button className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors">
              <Image src={searchbb} alt="Search" width={28} height={28} />
              <span className="text-[11px] font-medium">Search</span>
            </button>

            {/* Chat */}
            <button 
              onClick={() => openChatModal("chat")} 
              className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
            >
              <Image src={chatbb} alt="Chat" width={28} height={28} />
              <span className="text-[11px] font-medium">Chat</span>
            </button>

            {/* Menu */}
            {pathname !== "/" ? (
              <button
                onClick={onMobileMenuToggle}
                className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
              >
                <Image src={menubb} alt="Menu" width={28} height={28} />
                <span className="text-[11px] font-medium">Menu</span>
              </button>
            ) : (
              <button
                onClick={onToggleSidebar}
                className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
              >
                <Image src={menubb} alt="Menu" width={28} height={28} />
                <span className="text-[11px] font-medium">Menu</span>
              </button>
            )}

            {/* Announcement */}
            <button
              onClick={() => router.push("/announcement")}
              className="flex flex-col items-center justify-center gap-1 text-[#8b92a8] hover:text-white transition-colors"
            >
              <Image
                src={announcementbb}
                alt="Announcement"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-[10px] font-medium">Announcement</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function MobileSidebar({
  onMobileMenuToggle,
  isOpen,
  onClose,
  status,
}: {
  onMobileMenuToggle?: () => void;
  isOpen: boolean;
  onClose: () => void;
  status?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState("");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (!pathname) return;
    const page = pathname.split("/").filter(Boolean).pop() || "casino";
    setCurrentPage(page);
  }, [pathname]);
  
  if (!isOpen) return null;
  
  const filteredSidebar = filterSidebarGroups(
    sidebarGroups,
    isAuthenticated === "authenticated"
  );
  
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[1001] lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-[85%] bg-[#13151a] z-[1002] lg:hidden shadow-2xl transform transition-transform duration-300 ease-out overflow-y-auto scrollbar-hide">
        {/* Header with close button */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800">
          <Link href="/" onClick={onClose}>
            <Image
              src={logo}
              alt="Wolf Casino"
              width={120}
              height={32}
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-1.5 bg-gray-800 rounded-lg hover:bg-gray-700 active:scale-90 transition-all"
          >
            <Image src={cross} alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="px-3 py-4 space-y-2">
          {filteredSidebar.map((group) =>
            group.items.map((item) => {
              const isActive = currentPage === item.link.replace("/", "");
              const isHovered = hoveredItem === item.name;
              
              return (
                <button
                  key={item.name}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => {
                    if (item.link) {
                      router.push(item.link);
                      setCurrentPage(item.link.replace("/", ""));
                      onClose();
                    }
                  }}
                  className={cn(
                    "w-full flex  items-center gap-4 px-4 py-2 rounded-xl transition-all duration-200",
                    isActive
                      ? "text-white"
                      : "text-[#d3d5db] bg-[#242B35] hover:bg-transparent"
                  )}
                  style={isActive ? { background: "linear-gradient(90deg, #0D6BEF 0%, #6FFCF7 123.17%)" } : undefined}
                >
                  <div className="relative w-[26px] h-[26px]">
                    <Image
                      src={isActive || isHovered ? item.hicon : item.icon}
                      alt={item.name}
                      width={22}
                      height={22}
                      className="transition-all duration-200"
                    />
                  </div>
                  <span className="text-[15px] font-medium">{item.name}</span>
                </button>
              );
            })
          )}
        </nav>
      </div>
    </>
  );
}
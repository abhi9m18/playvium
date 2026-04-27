"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NotificationModal from "@/components/model/NotificationModal";
import { useSearchModal } from "@/context/SearchModalContext";
import Image from "next/image";
import {
  logo,
  hamburgur,
  search2,
  globe,
  message,
  gift,
  notification,
  gold,
  twonotes,
  wulfcoin,
} from "@/assets/images/home";
import { plus } from "@/assets/icons/hbs";

import { useAuthModal } from "@/store/auth-modal-store";
import { useChatModal } from "@/store/chat-modal-store";
import Link from "next/link";
import ProfileDropdown from "../profile/dropdown/ProfileDropdown";
import LanguageModal from "../model/LanguageModal";
import { useProfileMenu } from "@/context/ProfileMenuContext";
import ProfileModal from "../model/profile/profile-modal";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/auth-store";
import { getWalletBalance } from "@/api/wallet/wallet.api";

type WalletRightProps = {
  header?: React.ReactNode;
};

type WalletBalanceResponse = {
  userId: string;
  wulfCash: number;
  wulfCoin: number;
};

export default function Header({
  onToggleSidebar,
  status,
  setIsRedeemOpen = () => {},
  state = { currentPage: "Home", isSignUp: false },
}: {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  status?: string;
  session?: any;
  setIsLoginModalActive?: (active: boolean) => void;
  setIsDepositModalActive?: (active: boolean) => void;
  setIsRedeemOpen?: (active: boolean) => void;
  unreadCount?: number;
  state?: any;
}) {
  const { openModal: openAuthModal } = useAuthModal();
  const { openModal: openChatModal } = useChatModal();
  const { profileOpen, setProfile } = useProfileMenu();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { token } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState<WalletBalanceResponse | null>(null);

  // Add state
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [walletError, setWalletError] = useState<string | null>(null);


  const { open } = useSearchModal();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const fetchWalletBalance = async () => {
    try {
      if (!token) return;

      setLoading(true);
      const data: WalletBalanceResponse = await getWalletBalance();
      setWallet(data);
      setWalletError(null);
    }  catch (err: any) {
      setWalletError("Unable to load");
      toast.error(err?.message || "Unable to refresh wallet");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchWalletBalance();
  }, [token]);

  useEffect(() => {
    const handleWalletRefresh = () => {
      fetchWalletBalance();
    };

    window.addEventListener("wallet-refresh", handleWalletRefresh);

    return () => {
      window.removeEventListener("wallet-refresh", handleWalletRefresh);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.id !== "dropdownSearch"
      ) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCurrency = () => {
    setActiveCurrency((prev) => {
      const next = prev === "coins" ? "cash" : "coins";
      sessionStorage.setItem("activeCurrency", next);
      return next;
    });
  };

  const [activeCurrency, setActiveCurrency] = useState<"coins" | "cash">(() => {
    if (typeof window === "undefined") return "coins";
    return (
      (sessionStorage.getItem("activeCurrency") as "coins" | "cash") || "coins"
    );
  });

  useEffect(() => {
    sessionStorage.setItem("activeCurrency", activeCurrency);
  }, [activeCurrency]);

  if (isAuthenticated === null) {
    return <div className="fixed w-full z-999 h-[66px] bg-[#0F131A]"></div>;
  }

  const wulfCash = wallet?.wulfCash ?? 0;
  const wulfCoin = wallet?.wulfCoin ?? 0;

  const displayValue =
    activeCurrency === "cash" ? wulfCash.toFixed(2) : wulfCoin.toLocaleString();

  return (
    <div className="fixed w-full z-999 bg-[#051034]">
      {/* Desktop & Tablet Header */}
      {profileOpen && <ProfileModal onClose={() => setProfile(false)} />}
      <div className="hidden md:flex items-center justify-between w-full h-[66px] px-3">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className={`bg-[#092D61] hover:bg-black rounded-md w-11 h-11`}
          >
            <Image      
              src={hamburgur}
              alt="Toggle Sidebar"
              width={25}
              height={25}
              className="w-6 h-6"
            />
          </Button>

          <Link
            href="/"
            onClick={() => {
              state.currentPage = "Home";
            }}
            className="flex ml-2 items-center"
          >
            <Image
              height={0}
              width={160}
              src={logo}
              alt="Logo"
              className="w-45 h-30"
            />
          </Link>
        </div>

        {/* Right: controls */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="border-[3px] border-white/30 border-t-[3px] border-t-white rounded-full w-6 h-6 animate-spin" />
          ) : status === "authenticated" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={open}
                className={`w-10 h-10 rounded-lg bg-[#092D61] flex items-center justify-center hover:bg-black/80 transition`}
              >
                <Image src={search2} alt="Search" width={20} height={20} />
              </button>

              <Link href="/vip">
                <div className="flex items-center gap-1 h-10 px-3 rounded-xl cursor-pointer">
                  <Image src={gold} alt="Gold" width={30} height={30} />
                  <span className="text-yellow-400">Gold</span>
                </div>
              </Link>

              <div className="relative">
                <div className="flex items-center bg-[#092D61] border-[#170919] pr-1 rounded-[10px] h-11 min-w-[200px] border  overflow-hidden">
                  <div
                    onClick={toggleCurrency}
                    className="relative w-20 h-9 ml-0.5 rounded-[7px]  bg-[#021227] overflow-hidden"
                  >
                    <Image
                      src={twonotes}
                      alt="Cash"
                      width={40}
                      height={40}
                      className={`absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        activeCurrency === "coins"
                          ? "opacity-100 "
                          : "opacity-60 "
                      }`}
                    />
                    <Image
                      src={wulfcoin}
                      alt="Coins"
                      width={38}
                      height={38}
                      className={`absolute right-1 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        activeCurrency === "cash"
                          ? "opacity-100"
                          : "opacity-60 "
                      }`}
                    />
                  </div>

                  {/* VALUE */}
                  <div className="flex-1 text-center flex items-center justify-center px-3">
                  <span
  className={`
    text-[14px] md:text-[15px] font-normal tracking-wide
    transition-all duration-300
    flex items-center justify-center
    ${
      walletError
        ? "text-red-400"
        : activeCurrency === "coins"
        ? "text-[#FBCC0E]"
        : "text-[#6BF68B]"
    }
  `}
>
  {loading ? (
    <span className="flex items-center gap-1">
    <span className="w-3 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.9s]" />
    <span className="w-3 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.7s]" />
    <span className="w-3 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.5s]" />
    {/* <span className="w-3 h-1 rounded-full bg-current animate-bounce" /> */}
  </span>
  ) : walletError ? (
    "Error"
  ) : (
    displayValue
  )}
</span>
                  </div>

                  {/* PLUS BUTTON */}
                  <Link href="/profile?tab=buy">
                    <div
                      className=" md:hidden
    w-[40px] h-[40px]
    rounded-full
    flex items-center justify-center
    transition-all
  "
                    >
                      <Image
                        src={plus}
                        alt="Add"
                        width={20}
                        height={20}
                        className="w-[40px] h-[40px]"
                      />
                    </div>
                  </Link>
                  <Link href="/profile?tab=buy">
                    <button className="hidden md:flex h-9 px-5 rounded-[7px] justify-center items-center text-center bg-[#187BF0] text-white font-bold text-[15px]  transition-all">
                      Buy
                    </button>
                  </Link>
                </div>
              </div>

              <Link href={"/rewards"}>
                <button
                  onClick={() => setIsRedeemOpen(true)}
                  className={`w-10 h-10 rounded-lg bg-[#092D61] flex items-center justify-center hover:bg-black/80 transition`}
                >
                  <Image src={gift} alt="Gift" width={20} height={20} />
                </button>
              </Link>
              <div className="flex items-center bg-[#092D61] rounded-lg overflow-hidden">
                {/* Chat */}
                <button
                  onClick={() => openChatModal("chat")}
                  className="w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                >
                  <Image src={message} alt="Messages" width={20} height={20} />
                </button>

                {/* Divider */}
                <div className="w-px h-6 bg-white/20" />

                {/* Notification */}
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="w-10 h-10 relative flex items-center justify-center hover:bg-black/80 transition"
                >
                  <Image
                    src={notification}
                    alt="Notifications"
                    width={20}
                    height={20}
                  />

                  {/* Badge */}
                  {/* {unreadCount > 0 && (
      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        {unreadCount}
      </span>
    )} */}
                </button>
              </div>

              <ProfileDropdown
                menuType={"top"}
                openLanguageModal={() => setIsLanguageOpen(true)}
              />
            </div>
          ) : (
            <>
              <button
                onClick={open}
                className={`w-10 h-10 rounded-lg bg-[#092D61] flex items-center justify-center hover:bg-black/80 transition`}
              >
                <Image src={search2} alt="Search" width={20} height={20} />
              </button>

              <Button
                onClick={() => openAuthModal("login")}
                className="h-10 px-6 rounded-lg bg-[#384252] border border-[#5B6B86] text-white font-bold text-[15px] hover:bg-[#4a5464] transition"
              >
                Sign In
              </Button>

              <Button
                onClick={() => openAuthModal("register")}
                className="h-10 px-6 rounded-lg bg-[#187BF0] text-white font-bold text-[15px] hover:bg-[#1469D4] transition"
              >
                Sign Up
              </Button>

              <div className="flex items-center bg-[#092D61] rounded-lg overflow-hidden">
                <button
                  onClick={() => openChatModal("chat")}
                  className="w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                >
                  <Image src={message} alt="Chat" width={20} height={20} />
                </button>

                <div className="w-px h-6 bg-white/20" />

                <button
                  onClick={() => setIsLanguageOpen(true)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                >
                  <Image src={globe} alt="Language" width={20} height={20} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Header - UPDATED WITH CURRENCY SWITCHER */}
      <div className="flex md:hidden items-center justify-between w-full h-[62px] px-3 border-0 border-[#1f2937]">
        {/* Left side - Logo only */}
        <Link href="/" onClick={() => (state.currentPage = "Home")}>
          <Image
            src={logo}
            alt="Wolf Casino"
            width={120}
            height={32}
            className="h-9 min-w-14 w-auto"
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <div className="border-[3px] border-white/30 border-t-[3px] border-t-white rounded-full w-5 h-5 animate-spin" />
          ) : status === "authenticated" ? (
            <>
              <div className="relative flex">
                <button className="flex items-center bg-[#000000] rounded-full h-10 min-w-[180px] md:min-w-[200px] border border-[#050208] overflow-hidden">
                  <div
                    onClick={toggleCurrency}
                    className="relative w-[80px] h-9 ml-[2px] rounded-full  bg-[#350747] overflow-hidden"
                  >
                    <Image
                      src={twonotes}
                      alt="Cash"
                      width={38}
                      height={38}
                      className={`absolute right-1 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        activeCurrency === "cash"
                          ? "opacity-100 scale-110 brightness-110"
                          : "opacity-60 scale-100 brightness-90"
                      }`}
                    />

                    <Image
                      src={wulfcoin}
                      alt="Coins"
                      width={36}
                      height={36}
                      className={`absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                        activeCurrency === "coins"
                          ? "opacity-100 scale-110 brightness-110"
                          : "opacity-60 scale-100 brightness-90"
                      }`}
                    />
                  </div>

                  {/* VALUE */}
                  <div className="flex-1 text-center flex items-center justify-center px-3">
                    <span
  className={`
    text-[14px] md:text-[15px] font-normal tracking-wide
    transition-all duration-300
    flex items-center justify-center
    ${
      walletError
        ? "text-red-400"
        : activeCurrency === "coins"
        ? "text-[#FBCC0E]"
        : "text-[#6BF68B]"
    }
  `}
>
  {loading ? (
    <span className="flex items-center gap-1">
    <span className="w-3 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.9s]" />
    <span className="w-3 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.7s]" />
    <span className="w-3 h-1 rounded-full bg-current animate-bounce [animation-delay:-0.5s]" />
    <span className="w-3 h-1 rounded-full bg-current animate-bounce" />
  </span>
  ) : walletError ? (
    "Error"
  ) : (
    displayValue
  )}
</span>

                  </div>

                  {/* PLUS BUTTON */}
                  <Link href="/profile?tab=buy">
                    <div
                      className="
    w-[40px] h-[40px]
    rounded-full
    flex items-center justify-center
    transition-all
  "
                    >
                      <Image
                        src={plus}
                        alt="Add"
                        width={20}
                        height={20}
                        className="w-[40px] h-[40px]"
                      />
                    </div>
                  </Link>
                </button>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`w-10 h-10 ml-2 rounded-lg bg-gray-950 relative flex items-center justify-center hover:bg-black/80 transition`}
                >
                  <Image
                    src={notification}
                    alt="Notifications"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Unauthenticated Mobile Header */}
              <Button
                onClick={() => openAuthModal("login")}
                className="h-9 px-3 rounded-lg bg-[#384252] border border-[#5B6B86] text-white font-normal text-sm hover:bg-[#4a5464] transition"
              >
                Sign In
              </Button>

              <Button
                onClick={() => openAuthModal("register")}
                className="h-9 px-3 rounded-lg bg-[#187BF0] text-white font-bold text-sm hover:bg-[#1469D4] transition"
              >
                Sign Up
              </Button>

              <button
                onClick={() => setIsLanguageOpen(true)}
                className={`w-10 h-10 rounded-lg bg-[#092D61] flex items-center justify-center hover:bg-black/80 transition`}
              >
                <Image
                  height={20}
                  width={20}
                  src={globe}
                  alt="Language"
                />
              </button>
            </>
          )}
        </div>
      </div>
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
      <LanguageModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
      />
    </div>
  );
}

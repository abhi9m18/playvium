"use client";

import {
  badge,
  dollericon,
  languageicon,
  leftrightarrow,
  profile,
  tags,
  usercheck,
  wallet,
} from "@/assets/icons";
import { dino } from "@/assets/images/home";
import { useProfileMenu } from "@/context/ProfileMenuContext";
import { useAuthStore } from "@/store/auth-store";

import { LogOut, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProfileMenuProps {
  onClose: () => void;
  openLanguageModal: () => void;
}
const menuItems = [
  { icon: wallet, label: "Wallet", route: "profile?tab=wallet" },
  { icon: usercheck, label: "KYC", route: "/kyc" },
  { icon: badge, label: "Referrals", route: "/referral" },
  { icon: leftrightarrow, label: "Transaction", route: "/profile?tab=history" },
  { icon: tags, label: "Rollover", route: "/profile?tab=rollover" },
  { icon: dollericon, label: "Bet History", route: "/profile?tab=bet" },
];

export default function ProfileMenu({
  onClose,
  openLanguageModal,
}: ProfileMenuProps) {
  const { logout } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  const { setProfile } = useProfileMenu();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = (route: string) => {
    router.push(route);
    onClose();
  };

  return (
    <div className="bg-[#15181D] rounded-t-lg md:rounded-lg overflow-hidden w-full md:w-72">
      {/* Menu Items */}
      <div className="py-3">
        <button
          onClick={() => {
            console.log("hello");
            setProfile(true);
            onClose();
          }}
          className="w-full px-4 py-3 flex items-center gap-3 text-slate-100 hover:bg-[#0d0e11] hover:text-white transition-all duration-200 group relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-3 w-full">
            <Image
              height={1000}
              width={1000}
              src={dino}
              alt="Language"
              className="w-6 h-6"
            />
            <div className="flex-1 text-left">
              <span className="block text-md font-normal">Profile</span>
            </div>
            <span className="bg-[#000000] p-1 rounded-md">
              <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-400 transition-all" />
            </span>
          </div>
        </button>
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavigation(item.route)}
            className="w-full px-4 py-3 flex items-center gap-3 text-slate-100 hover:bg-[#0d0e11] hover:text-white transition-all duration-200 group relative overflow-hidden"
          >
            <div className="relative z-10 justify-between flex items-center gap-3 w-full">
              <div className="flex gap-3">
                <Image
                  height={40}
                  width={120}
                  src={item.icon}
                  alt="Language"
                  className="w-6 h-6"
                />
                <div className="flex w-full text-center gap-2">
                  <span className="block text-md font-normal">
                    {item.label}
                  </span>
                </div>
              </div>

              <span className="bg-[#000000] p-1 rounded-md">
                <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-400 transition-all" />
              </span>
            </div>
          </button>
        ))}

        <button
          onClick={openLanguageModal}
          className="w-full px-4 py-3 flex items-center gap-3 text-slate-100 hover:bg-[#0d0e11] hover:text-white transition-all duration-200 group relative overflow-hidden"
        >
          <div className="relative z-10 justify-between flex items-center gap-3 w-full">
            <div className="flex gap-3">
              <Image
                height={40}
                width={120}
                src={languageicon}
                alt="Language"
                className="w-6 h-6"
              />
              <div className="flex w-full text-center gap-2">
                <span className="block text-md font-normal">Language</span>

                <span className="text-xs mt-1 ml-16 text-center text-slate-300">
                  English
                </span>
              </div>
            </div>

            <span className="bg-[#000000] p-1 rounded-md">
              <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-400 transition-all" />
            </span>
          </div>
        </button>

        <button
          onClick={() => {
            logout();
            toast.success("Logout Successful");
          }}
          className="w-full px-4 py-4 flex items-center gap-3 text-slate-100 hover:bg-[#0d0e11] hover:text-white transition-all duration-200 group relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-3 w-full">
            <LogOut className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-purple-400 transition-colors" />

            <div className="flex-1 text-left">
              <span className="block text-sm font-medium">Log out</span>
            </div>
            <span className="bg-[#000000] p-1 rounded-md">
              <ChevronRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-400 transition-all" />
            </span>
          </div>
        </button>
        <button
          onClick={onClose}
          className="w-full sm:hidden px-4 py-3 flex items-center gap-3 text-slate-100 hover:bg-slate-700 hover:text-white transition-all duration-200 group relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-3 w-full">
            <X className="w-5 h-5 shrink-0 text-slate-400 group-hover:text-[#a32dd6] transition-colors" />

            <div className="flex-1 text-left">
              <span className="block text-sm font-medium">Close</span>
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
    </div>
  );
}
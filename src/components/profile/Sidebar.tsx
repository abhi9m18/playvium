"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight, LogOut, Heart, ArrowLeft } from "lucide-react";

import {
  wallet,
  redeem,
  history,
  rollover,
  bet,
  profile,
  tags,
  coingold,
  languageicon,
  logouticon,
  referrals,
  kyc,
  edit,
} from "@/assets/icons";

import { dino,mennew } from "@/assets/images/home";
import { useAuthStore } from "@/store/auth-store";
import { useProfileMenu } from "@/context/ProfileMenuContext";
import EditProfile from "./EditProfile";
// import EditProfile from "@/components/EditProfile";

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: Props) {
  const { logout } = useAuthStore();
  const { profileOpen, setProfile } = useProfileMenu();

  const user = {
    name: "Abhinav Mishra",
    id: "58180549",
    avatar: profile,
  };

  /* Desktop Menu */
  const menu = [
    { key: "wallet", label: "Wallet", icon: wallet },
    { key: "buy", label: "Buy Wulf Coin", icon: coingold },
    { key: "redeem", label: "Redeem", icon: redeem },
    { key: "history", label: "Transaction History", icon: history },
    { key: "rollover", label: "Rollover", icon: tags },
    { key: "bet", label: "Bet History", icon: bet },
  ];

  /* Mobile Menu */
  const mobilemenu = [
    { key: "wallet", label: "Wallet", icon: wallet },
    { key: "kyc", label: "KYC", icon: kyc },
    { key: "buy", label: "Buy Wulf Coin", icon: coingold },
    { key: "redeem", label: "Redeem", icon: redeem },
    { key: "history", label: "Transaction", icon: history },
    { key: "rollover", label: "Rollover", icon: tags },
    { key: "bet", label: "Bet History", icon: bet },
    { key: "referrals", label: "Referrals", icon: referrals },
    { key: "language", label: "Language", icon: languageicon },
  ];

  const renderMenu = (items: typeof menu) => (
    <nav className="flex flex-col gap-2 flex-1">
      {items.map((item) => {
        const isActive = activeTab === item.key;

        return (
          <button
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-all
              ${
                isActive
                  ? "bg-[#187BF0] text-white"
                  : " bg-[#0C2851] text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <Image src={item.icon} alt="" width={20} height={20} />
              <span className="text-sm">{item.label}</span>
            </div>

            {/* <ChevronRight
              size={12}
              className={`w-5 h-5 rounded-sm bg-gray-800 ${
                isActive ? "text-purple-400" : "text-gray-400"
              }`}
            /> */}
          </button>
        );
      })}
    </nav>
  );

  return (
    <aside className="w-full md:w-85 h-full flex flex-col bg-transparent md:bg-[#06162D] text-white p-0 md:p-4 mt-4 md:-mt-2">
      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden">
        {profileOpen ? (
          /* ===== EDIT PROFILE ===== */
          <EditProfile
            header={
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setProfile(false)}
                  className="p-2 rounded-md bg-[#191D24]"
                >
                  <ArrowLeft size={18} />
                </button>
                <h2 className="text-lg font-semibold">Edit Profile</h2>
              </div>
            }
          />
        ) : (
          /* ===== SIDEBAR ===== */
          <div className="flex flex-col gap-2">
            {/* Profile Card */}
            <div className="relative bg-[#191D24] rounded-lg p-4 shadow-md flex flex-col items-center gap-3">
              {/* Heart */}
              <div className="absolute left-3 top-3 bg-[#14171d] px-2 py-1 rounded-md flex items-center gap-1">
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span className="text-xs font-semibold text-white">0</span>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setProfile(true)}
                className="absolute right-3 top-3 bg-[#14171d] p-1.5 rounded-md hover:opacity-80 transition"
              >
                <Image src={edit} alt="edit" width={14} height={14} />
              </button>

              <Image
                src={user.avatar}
                width={70}
                height={70}
                alt="avatar"
                className="rounded-full border border-[#2C2F36]"
              />

              <div className="text-center">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-xs text-gray-400">
                  User ID: {user.id}
                </p>
              </div>
            </div>

            {/* Menu */}
            <div className="bg-[#191D24] rounded-lg p-4 shadow-md flex flex-col">
              <button
                onClick={() => setProfile(true)}
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg bg-[#2A2D33] text-purple-400 mb-2"
              >
                <div className="flex items-center gap-3">
                  <Image src={dino} alt="" width={20} height={20} />
                  <span className="text-sm">Profile</span>
                </div>
                <ChevronRight
                  size={12}
                  className="text-purple-400 bg-gray-800 w-5 h-5 rounded-sm"
                />
              </button>

              {renderMenu(mobilemenu)}

            </div>
          </div>
        )}
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:flex flex-col h-full">
        <div className="flex items-center gap-4 mb-6">
          <Image
          src={mennew}
            // src={user.avatar}
            width={60}
            height={60}
            alt="avatar"
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-xs text-gray-400">User ID: {user.id}</p>
          </div>
        </div>

        {renderMenu(menu)}

      </div>
    </aside>
  );
}
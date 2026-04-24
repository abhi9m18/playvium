"use client";
import { X, ChevronLeft, Heart, Edit2, ChevronRight } from "lucide-react";
import { useState } from "react";
import EditProfile from "../../profile/EditProfile";
import Medals from "./medal-modal";
import Statistics from "./Statistics";
import Image from "next/image";
import {
  bets,
  medal1,
  medal10,
  medal11,
  medal2,
  medal3,
  medal4,
  medal5,
  medal6,
  medal7,
  medal8,
  medal9,
  statistics,
  wagerd,
  whitewulf,
  wins,
} from "@/assets/images/profile";
import { edit } from "@/assets/icons";

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [mode, setMode] = useState("profile");
  const [selectedAvatar] = useState(1);
  const [chatName] = useState("Zeafseppentac");
  const medalIcons = [
    medal1,
    medal2,
    medal3,
    medal4,
    medal5,
    medal6,
    medal7,
    medal8,
    medal9,
    medal10,
  ];
  return (
    <div className="fixed inset-0 bg-black/40 md:flex md:items-center md:justify-center md:p-4 z-9999">
      <div className="bg-[#1a1f26] h-full md:h-auto md:rounded-lg w-full md:max-w-lg md:max-h-[90vh] overflow-y-auto md:shadow-2xl">
        {mode === "edit" ? (
          <>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <button
                onClick={() => setMode("profile")}
                className="text-white hover:opacity-80 transition"
              >
                <ChevronLeft size={24} />
              </button>
              <h2 className="text-lg font-bold text-white">Edit Profile</h2>
              <button
                onClick={onClose}
                className="text-white hover:opacity-80 transition"
              >
                <X size={24} />
              </button>
            </div>
            <EditProfile />
          </>
        ) : mode === "profile" ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#2d3139] bg-[#14171d]">
              <button
                onClick={() => setMode("profile")}
                className="text-white hover:opacity-80  md:hidden transition"
              >
                Back
              </button>
              <h2 className="text-md font-medium text-white text-center hidden lg:block">
                My Profile
              </h2>
              <button
                onClick={onClose}
                className=" rounded-lg bg-[#242B35] hidden lg:block text-white hover:opacity-80 p-1.5 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Profile Section */}
            <div className="p-6 border-b border-[#2d3139] bg-[#242B35] relative flex flex-col items-center">
              {/* Heart - Left Top */}
              <div className="absolute bg-[#14171d] p-2 rounded-lg left-6 top-6 flex items-center gap-2">
                <Heart className="text-red-500 fill-red-500" size={18} />
                <span className="text-white font-semibold">0</span>
              </div>

              {/* Edit Button - Right Top */}
              <button
                onClick={() => setMode("edit")}
                className="absolute right-6 top-6 bg-[#14171d] p-2 rounded-lg flex items-center justify-center gap-2 text-gray-400 hover:opacity-80 transition font-medium"
              >
                <Image
                  src={edit}
                  alt="Edit"
                  width={16}
                  height={16}
                  className=""
                />
              </button>

              {/* Avatar & Name Section - Centered */}
              <div className="flex flex-col items-center gap-2 mt-6">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full ring-1 ring-accent overflow-hidden bg-muted">
                  <img
                    src="/profiles/cyberpunk-demon-mask-red-purple.jpg"
                    alt="Current avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-white font-bold text-lg">Zeafseppentac</h3>
                <p className="text-gray-400 text-sm">User ID: 1203456</p>
              </div>
            </div>

            {/* Medals Section */}
            <div className="px-4 bg-[#242B35]">
              <div className="p-2  rounded-lg bg-[#191D24]">
                <div className="flex border-b-2 px-3 py-3 border-[#272F42] items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <span>
                      <Image
                        src={medal11}
                        alt={`medel`}
                        width={16}
                        height={16}
                        className="rounded-lg"
                      /></span> Medals 0
                  </h4>

                  <span
                    className="inline-flex items-center gap-1 text-purple-500 text-xs cursor-pointer "
                    onClick={() => setMode("medals")}
                  >
                    Details
                    <ChevronRight size={20} className="text-purple-500" />
                  </span>
                </div>

                {/* Scrollable Medal List */}
                <div className="flex justify-around overflow-x-auto no-scrollbar">
                  {medalIcons.map((icon, i) => (
                    <div
                      key={i}
                      className="hover:scale-110 transition cursor-pointer shrink-0"
                      role="button"
                      tabIndex={0}
                    >
                      <Image
                        src={icon}
                        alt={`medal-${i + 1}`}
                        width={33}
                        height={33}
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="p-4 bg-[#242B35]">
              <div className="p-4 rounded-lg bg-[#191D24]">
                <div className="flex border-b-2 py-4 border-[#272F42] items-center justify-between mb-4">
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    <span>
                      <Image
                        src={statistics}
                        alt={`medel`}
                        width={22}
                        height={22}
                        className="rounded-lg"
                      /></span> Statistics
                  </h4>
                  <span
                    className="inline-flex items-center gap-1 text-purple-500 text-xs cursor-pointer"
                    onClick={() => setMode("statistics")}
                  >
                    Details
                    <ChevronRight size={20} className="text-purple-500" />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {/* TOTAL WINS */}
                  <div className="bg-[#252d36] p-3 rounded text-center">
                    <div className="flex items-center justify-center gap-2 text-white text-xs">
                      <Image
                        src={wins}
                        alt="wins"
                        width={20}
                        height={20}
                        className="rounded"
                      />
                      <span>Total Wins</span>
                    </div>
                    <div className="text-white text-2xl font-normal mt-1">0</div>
                  </div>

                  {/* TOTAL BETS */}
                  <div className="bg-[#252d36] p-3 rounded text-center">
                    <div className="flex items-center justify-center gap-2 text-white text-xs">
                      <Image
                        src={bets}
                        alt="bets"
                        width={20}
                        height={20}
                        className="rounded"
                      />
                      <span>Total Bets</span>
                    </div>
                    <div className="text-white text-2xl font-normal mt-1">0</div>
                  </div>
                </div>

                {/* TOTAL WAGERED */}
                <div className="bg-[#252d36] p-3 rounded text-center mt-3">
                  <div className="flex items-center justify-center gap-2 text-white text-xs">
                    <Image
                      src={wagerd}
                      alt="wagered"
                      width={20}
                      height={20}
                      className="rounded"
                    />
                    <span>Total Wagered</span>
                  </div>
                  <div className="text-white text-2xl font-normal mt-1">0</div>
                </div>

              </div>
            </div>

            {/* Top 3 Favorite Games */}
            <div className="p-4 bg-[#242B35]">
              <div className="p-4 border-b rounded-lg border-[#2d3139] bg-[#191D24]">
                <h4 className="text-white font-normal border-b-2 py-3 border-[#272F42] mb-4">
                  Top 3 Favorite Games
                </h4>
                <div className="rounded-lg p-8 flex flex-col items-center justify-center min-h-32">
                  <Image
                    alt="white wolf"
                    height={100}
                    width={100}
                    src={whitewulf}
                  />
                  <p className="text-gray-400 text-center text-sm">
                    Oops! There is no data yet!
                  </p>
                </div>
              </div>
            </div>

            {/* Wager Content */}
            <div className="p-4 bg-[#242B35]">
              <div className="p-4 border-b rounded-lg border-[#2d3139] bg-[#191D24]">
                <h4 className="text-white font-normal mb-4 py-3 border-b-2 border-[#272F42]">
                  Wager Contest
                </h4>
                <div className="rounded-lg p-8 flex flex-col items-center justify-center min-h-32">
                  <Image
                    alt="white wolf"
                    height={100}
                    width={100}
                    src={whitewulf}
                  />
                  <p className="text-gray-400 text-center text-sm">
                    Oops! There is no data yet!
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : mode === "medals" ? (
          <Medals onBack={() => setMode("profile")} onClose={onClose} />
        ) : mode === "statistics" ? (
          <Statistics onBack={() => setMode("profile")} onClose={onClose} />
        ) : null}
      </div>
    </div>
  );
}

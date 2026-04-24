"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  exclamation_mark,
  spin,
  coingold,
  coingreen,
} from "@/assets/icons";
import GiftPendingList from "./GiftPendingList";
import GiftHistoryList from "./GiftHistoryList";
import RedemptionProgressModal from "@/components/model/RedemptionProgressModal";
import { tick } from "@/assets/images/model";

export default function GiftCardPage() {
  const [activeTab, setActiveTab] = useState<"pending" | "history">("pending");

  const [isRedemptionOpen, setIsRedemptionOpen] = useState(false);

  const handleConfirmRedeem = () => {
    console.log("Redeem Confirmed");
  };

  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-[8px] md:text-xs">
            Remaining Number of Withdrawal Today:
          </p>
          <h2 className="text-white text-2xl md:text-4xl font-medium mt-1">
            99
          </h2>
        </div>

        {/* Timer */}
        <div className="text-right">
          <p className="text-white text-xs flex justify-end gap-1 items-center">
            <Image
              src={exclamation_mark}
              alt="warning"
              className="w-3 h-3 object-contain"
            />
            Withdrawal Time
          </p>

          <div className="flex flex-col items-center">
            {/* TIME ROW */}
            <div className="grid grid-cols-3 gap-0.5 text-red-500 text-2xl md:text-3xl font-bold">
              <span className="text-center">24 :</span>
              <span className="text-center">00 :</span>
              <span className="text-center">00</span>
            </div>

            {/* LABEL ROW */}
            <div className="grid grid-cols-3 gap-10 md:gap-16 text-gray-400 text-xs font-normal mt-1">
              <span className="text-center">hr</span>
              <span className="text-center">m</span>
              <span className="text-center">s</span>
            </div>
          </div>
        </div>
      </div>
      {/* ================= SPIN + WIN CARD ================= */}
      <div className=" relative w-full flex flex-col lg:flex-row items-start sm:gap-10 justify-between sm:justify-center">
        {/* Left Side → Wheel + Spin Button */}
        <div className="flex flex-col items-center justify-center w-full lg:w-auto mr-10">
          {/* Spin Wheel */}
          <Image
            src={spin}
            alt="Spin Wheel"
            width={300}
            height={390}
            className="select-none"
          />

          {/* Spin Left Button */}
          <button className="bg-[#B93DEB] text-white px-10 py-3 rounded-lg font-semibold shadow-md hover:bg-[#b14ae6] mt-6">
            10 Spin Left
          </button>
        </div>

        {/* Right Side → Win Card */}
        <div className="w-full hidden lg:w-auto sm:flex justify-end lg:justify-end mt-4 absolute bottom-4 right-4">
          <div className="bg-[#191D24] border border-gray-800 p-4 rounded-xl sm:w-48 shadow-lg flex flex-col">
            <p className="text-center text-white text-sm font-normal">
              You won
            </p>

            {/* Win Details */}
            <div className="flex justify-between px-4 mt-4">
              {/* LEFT */}
              <div className="flex flex-col items-center gap-1">
                <Image src={coingold} alt="coin" width={22} height={22} />
                <span className="text-white font-semibold text-lg">30K</span>
              </div>

              {/* Divider */}
              <div className="w-px bg-gray-600 h-10"></div>

              {/* RIGHT */}
              <div className="flex flex-col items-center gap-1">
                <Image src={coingreen} alt="cash" width={22} height={22} />
                <span className="text-green-400 font-semibold text-lg">
                  150
                </span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => {
                handleConfirmRedeem();
                setIsRedemptionOpen(true);
              }}
              className="bg-[#384252] w-full text-white py-2 rounded-md font-bold text-sm mt-6 hover:bg-[#b14ae6]"
            >
              Confirm Redeem
            </button>
          </div>
        </div>
      </div>
      <div className="w-full sm:hidden pt-10">
        <div className="bg-[#191D24] border border-gray-800 p-4 rounded-xl sm:w-48 shadow-lg flex flex-col">
          <p className="text-center text-white text-sm font-normal">You won</p>

          {/* Win Details */}
          <div className="flex justify-between px-4 mt-4">
            {/* LEFT */}
            <div className="flex items-center gap-1">
              <Image src={coingold} alt="coin" width={22} height={22} />
              <span className="text-white font-semibold text-lg">30K</span>
            </div>

            {/* Divider */}
            <div className="w-px bg-gray-600 h-10"></div>

            {/* RIGHT */}
            <div className="flex items-center gap-1">
              <Image src={coingreen} alt="cash" width={30} height={30} />
              <span className="text-green-400 font-semibold text-lg">150</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => {
              handleConfirmRedeem();
              setIsRedemptionOpen(true);
            }}
            className="bg-[#384252] w-full text-white py-2 rounded-md font-bold text-sm mt-6 hover:bg-[#b14ae6]"
          >
            Confirm Redeem
          </button>
        </div>
      </div>
      {/* ================= TABS WITH SMOOTH ANIMATION ================= */}
      <div className="mt-14 flex flex-col items-start">
        {/* BUTTON WRAPPER WITH BG */}
        <div className="relative inline-flex bg-[#191D24] rounded-lg p-1">
          {/* Sliding Highlight */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-md bg-[#384252]"
            layout
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            initial={false}
            animate={{
              left: activeTab === "pending" ? "4px" : "65%",
              width:
                activeTab === "pending"
                  ? "calc(68% - 4px)"
                  : "calc(50% - 40px)",
            }}
          />

          <button
            onClick={() => setActiveTab("pending")}
            className={`relative z-10 px-5 py-3 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "pending"
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Pending redemptions
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`relative z-10 px-5 py-3 rounded-md text-sm font-medium transition-colors duration-300 ${
              activeTab === "history"
                ? "text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            History
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-6 w-full">
          {activeTab === "pending" && <GiftPendingList />}
          {activeTab === "history" && <GiftHistoryList />}
        </div>
      </div>

      <RedemptionProgressModal
        isOpen={isRedemptionOpen}
        onClose={() => setIsRedemptionOpen(false)}
        checkIcon={tick}
        wulfcoinIcon={coingold}
        cashIcon={coingreen}
        wulfcoinAmount="30K"
        cashAmount="150"
      />
    </div>
  );
}

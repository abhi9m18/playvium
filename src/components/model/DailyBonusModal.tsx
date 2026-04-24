"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface DailyBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  reward?: string;
  giftImg: StaticImageData | string;
  tickImg: StaticImageData | string;
}

export default function DailyBonusModal({
  isOpen,
  onClose,
  reward = "200,000 Diamond",
  giftImg,
  tickImg,
}: DailyBonusModalProps) {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      // you can auto-close here if you want
      // onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#242B35] max-w-sm w-[350px] rounded-2xl p-6 shadow-xl text-center border border-white/10"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 16 }}
          >
            <h2 className="text-xl font-semibold text-white">Daily Bonus</h2>
            <p className="text-sm text-white/60 mt-1">
              Login in daily to claim your bonus
            </p>

            {/* Animation Block */}
            <div className="flex items-center justify-center mt-6 h-40">
              <AnimatePresence mode="wait">
                {!claimed ? (
                  <motion.div
                    key="gift"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    // transition={{ type: "inertia"}}
                    className="my-6" 
                  >
                    <Image
                      src={giftImg}
                      alt="Daily bonus gift"
                      width={240}
                      height={240}
                      className="object-contain"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tick"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    // transition={{ type: "inertia"}}
                  >
                    <Image
                      src={tickImg}
                      alt="Daily bonus claimed"
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Amount */}
            <p className="text-white font-extralight mt-5">{reward}</p>

            {/* Buttons */}
            <div className="mt-6 flex justify-center items-center flex-col gap-3">
              {!claimed && (
                <button
                  onClick={handleClaim}
                  className=" bg-[#B93DEB] text-center hover:opacity-90 text-[14px] text-white font-normal py-1 px-7 rounded-sm"
                >
                  CLAIM
                </button>
              )}

              <button
                onClick={onClose}
                className=" bg-[#2B323D] text-white/80 text-[14px] hover:text-white mt-1 py-1 px-7 rounded-sm"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

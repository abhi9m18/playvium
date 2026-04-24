
"use client";

import { X } from "lucide-react";

type InfoModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  data?: BenefitInfo;
};


export type BenefitInfo = {
    intro: string;
    rules?: string[];
  };
  
  export const VIP_BENEFIT_INFO: Record<string, BenefitInfo> = {
    "Make it Rain": {
      intro:
        "Engage in chat conversations throughout the day to receive free coins as part of the Constant Chat Rains bonus.",
      rules: [
        "Six players level higher than 4 will be randomly selected and rewarded in chat room every 6 hours.",
        "Players will be randomly selected by Rain algorithm.",
        "Sending more messages increases your probability to get rewarded.",
        "If the user has sent only one message, there is still a chance to receive the rain bonus.",
        "Having more than one account per user is prohibited.",
        "If suspicious activity is detected, withdrawals may be suspended for manual review.",
      ],
    },
  
    "Playvium Coin Drops": {
      intro:
        "Earn free Playvium Coins distributed periodically to active players. Rewards vary based on activity and tier.",
    },
  
    Tips: {
      intro:
        "Send tips to other players in chat to show appreciation and unlock social perks.",
    },
  
    "VIP Spin": {
      intro:
        "Spin the VIP wheel to receive exclusive rewards available only to VIP members.",
    },
  
    "Level-up Bonus": {
      intro:
        "Receive a bonus every time you level up in the VIP system.",
    },
  };
  
export default function InfoModal({
  open,
  onClose,
  title,
  data,
}: InfoModalProps) {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl bg-[#1c222b] p-6 text-white">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-3">{title}</h3>

        {/* Intro */}
        <p className="text-sm text-white/80 leading-relaxed mb-4">
          {data.intro}
        </p>

        {/* Rules */}
        {data.rules && (
          <>
            <p className="text-sm font-semibold mb-2">Rules:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-white/75">
              {data.rules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

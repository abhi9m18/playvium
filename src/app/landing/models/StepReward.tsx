import { motion } from "framer-motion";
import { useState } from "react";
import { WaitlistFormState } from "./WaitlistModal";
import Image from "next/image";
import { copied } from "@/assets/landing";

type StepRewardProps = {
  form: WaitlistFormState;
  finish: () => void;
};

export default function StepReward({ form, finish }: StepRewardProps) {
  const [copiedlink, setCopiedlink] = useState(false);

  const referralLink =
    form.referralLink || "https://www.playvium.com/djskj54Wf26";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopiedlink(true);

    setTimeout(() => setCopiedlink(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Title */}
      <p className="text-sm text-white/80">Invite Friends with Referral link</p>

      {/* Referral Link Box */}
      <div className="relative">
        <input
          type="text"
          readOnly
          value={referralLink}
          className="w-full rounded-md bg-[#1C222C] px-4 py-3 pr-12 text-[14px] text-white border border-white/10 outline-none"
        />

        {/* Copy Button */}
        <button
          type="button"
          onClick={copyToClipboard}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
        >
          <Image
            src={copiedlink ? copied : copied}
            alt="copy"
            width={18}
            height={18}
            className={`opacity-70 hover:opacity-100 transition ${copiedlink ? "invert-50" : ""}`}
          />
        </button>
      </div>

      {/* Hint */}
      <p className="text-xs text-white/50">
        Share this link with friends and earn rewards.
      </p>

      {/* Continue */}
      <button
        type="button"
        onClick={finish}
        className="w-full rounded-sm bg-[#C66AF7] py-2 text-[14px] font-semibold text-white hover:opacity-90 transition"
      >
        Continue
      </button>
    </motion.div>
  );
}

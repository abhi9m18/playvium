"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Stepper from "./Stepper";
import StepJoin from "./StepJoin";
import StepVerify from "./StepVerify";
import StepReward from "./StepReward";

/* ---------- Types ---------- */

export type WaitlistFormState = {
  name: string;
  email: string;
  phone: string;
  country: string;
  otp: string;
  referralCode: string;
  referralLink: string; 
  entity: string;
};


type WaitlistModalProps = {
  open: boolean;
  onClose: () => void;
};

/* ---------- Component ---------- */

export default function WaitlistModal({
  open,
  onClose,
}: WaitlistModalProps) {
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState<WaitlistFormState>({
    name: "",
    email: "",
    phone: "",
    country: "+91",
    otp: "",
    referralCode: "",
    entity: "",
    referralLink: "",
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-[460px] max-w-[90%] rounded-[28px] bg-[#15181e] p-6 text-white relative"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 h-8 w-8 rounded-sm bg-[#272d35] flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {step === 1 && "Join Waitlist"}
          {step === 2 && "Verify Phone number"}
          {step === 3 && "Get Rewarded"}
        </h2>

        <Stepper step={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepJoin
              key="step1"
              form={form}
              setForm={setForm}
              next={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepVerify
              key="step2"
              form={form}
              setForm={setForm}
              next={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <StepReward
              key="step3"
              form={form}
              finish={onClose}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

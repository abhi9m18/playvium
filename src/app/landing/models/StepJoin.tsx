"use client";

import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import toast from "react-hot-toast";

import { WaitlistFormState } from "./WaitlistModal";

type StepJoinProps = {
  form: WaitlistFormState;
  setForm: Dispatch<SetStateAction<WaitlistFormState>>;
  next: () => void;
};

export default function StepJoin({ form, setForm, next }: StepJoinProps) {
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = (): boolean => {
    if (!form.name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }

    if (!form.email?.trim()) {
      toast.error("Email address is required");
      return false;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (!form.phone || !form.country) {
      toast.error("Phone number is required");
      return false;
    }

    const fullPhone = `+${form.country}${form.phone}`;
    if (!isValidPhoneNumber(fullPhone)) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const sendOtp = async () => {
    if (!validateForm()) return;

    // try {
    //   setLoading(true);

    //   const entity = form.email.trim();

    //   await axios.post("/auth/register", {
    //     entity,
    //     name: form.name,
    //     email: form.email,
    //     phone: form.phone,
    //     country: form.country,
    //     referralCode: form.referralCode || null,
    //     isAgreedToTermsConditions: true,
    //   });

    //   toast.success("OTP sent successfully");
    //   setForm((prev) => ({ ...prev, entity }));
    //   next();
    // } catch (err) {
    //   const error = err as AxiosError<{ message?: string }>;
    //   toast.error(
    //     error.response?.data?.message || "Failed to send OTP. Try again."
    //   );
    // } finally {
    //   setLoading(false);
    // }
    next();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px]">
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-sm bg-[#1C222C] px-3 py-2 text-white border border-white/10 outline-none focus:border-[#C66AF7]"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-sm bg-[#1C222C] px-3 py-2 text-white border border-white/10 outline-none focus:border-[#C66AF7]"
        />
      </div>

      {/* Phone Input */}
      <div className="phone-root">
        <PhoneInput
          international
          defaultCountry="IN"
          value={
            form.phone && form.country
              ? `+${form.country}${form.phone}`
              : undefined
          }
          onChange={(value) => {
            if (!value) return;

            const clean = value.replace("+", "");
            const match = clean.match(/^(\d{1,4})(\d+)$/);
            if (!match) return;

            setForm((prev) => ({
              ...prev,
              country: match[1],
              phone: match[2],
            }));
          }}
          className="custom-phone"
          placeholder="Enter phone number"
        />
      </div>

      {/* Referral Code */}
      <input
        type="text"
        placeholder="Referral Code (Optional)"
        value={form.referralCode}
        onChange={(e) =>
          setForm({ ...form, referralCode: e.target.value })
        }
        className="w-full rounded-sm bg-[#1C222C] px-3 py-2 text-white border border-white/10 outline-none focus:border-[#C66AF7]"
      />

      {/* Button */}
      <button
        type="button"
        disabled={loading}
        onClick={sendOtp}
        className="w-full rounded-sm bg-[#C66AF7] py-2 text-[14px] font-semibold text-white hover:opacity-90 transition disabled:opacity-60"
      >
        {loading ? "Sending OTP..." : "Get OTP"}
      </button>
    </motion.div>
  );
}

"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/store/auth-modal-store";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";

// Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OtpSchema } from "@/lib/validators/otp.schema";

// Zustand Store
import { useAuthStore } from "@/store/auth-store";
import { verifyResetOtp } from "@/api/auth/auth.api";

export default function VerifyOtpForm() {
  const { setView, payload, closeModal } = useAuthModal();
  const { verifyOtp, resendOtp, isLoading } = useAuthStore();

  const entity = payload?.email ?? "";

  if (!entity) {
    toast.error("Identifier missing. Please restart verification.");
    return null;
  }

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Form Control */
  const { setValue, watch, handleSubmit } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const otpValue = watch("otp");

  /** Countdown Timer */
  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  /** Submit OTP */
  const onSubmit = async ({ otp }: OtpSchema) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setOtpError(null);

    const origin = payload?.from ?? "register";

    try {
      const result =
        origin === "register"
          ? await verifyOtp({ entity, otp })     
          : await verifyResetOtp({ entity, otp })

      // Determine success field
      const isVerified =
        "verified" in result ? result.verified : result.success;

      if (!isVerified) {
        throw new Error(result?.message || "Invalid OTP");
      }

      toast.success("OTP verified successfully");

      // NEXT actions based on flow
      if (origin === "register") {
        closeModal();
        return;
      }

      if (origin === "forgot") {
        setView("reset", { entity, otp });
        return;
      }

      // Default: authenticated → close modal
      closeModal();
    } catch (err: any) {
      const msg = err?.message || "Invalid OTP";
      setOtpError(msg);
      toast.error(msg);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
        inputRefs.current[0]?.select?.();
      }, 50);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-submit when 6 digits are entered
  useEffect(() => {
    const digits = (otpValue || "").replace(/\D/g, "");
    if (digits.length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  const handleResend = async () => {
    if (resending) return;

    setResending(true);
    setOtpError(null);
    setTimer(30);

    const result = await resendOtp(entity);

    if (result.success) {
      toast.success(result.message || "OTP Resent Successfully");
    } else {
      toast.error(result.message || "Failed to resend OTP");
    }

    setValue("otp", "");
    inputRefs.current.forEach((el) => el && (el.value = ""));

    setTimeout(() => inputRefs.current[0]?.focus(), 50);
    setResending(false);
  };

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    if (otpError) setOtpError(null);

    const arr = otpValue.split("");
    while (arr.length < 6) arr.push("");
    arr[index] = value;
    setValue("otp", arr.join(""));

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      const arr = otpValue.split("");

      if (!arr[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        arr[index] = "";
        setValue("otp", arr.join(""));
      }
    }

    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < 5)
      inputRefs.current[index + 1]?.focus();
  };

  const setInputRef = (el: HTMLInputElement | null, i: number) => {
    inputRefs.current[i] = el;
  };

  /** UI */
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl text-center sm:text-left font-extrabold text-white">
        Verify OTP
      </h2>

      <p className="text-gray-400 text-base font-bold leading-5">
        OTP sent to {entity}
      </p>

      {/* OTP Boxes */}
      <div className="flex justify-between gap-2">
        {Array.from({ length: 6 }).map((_, i) => {
          const hasError = Boolean(otpError);
          return (
            <input
              key={i}
              maxLength={1}
              inputMode="numeric"
              className={`w-12 h-12 bg-[#191D24] text-white text-center text-lg font-bold rounded-lg 
              ${hasError
                  ? "border border-red-500 focus:border-red-500"
                  : "border border-[#242B35] focus:border-purple-500"
                }`}
              disabled={resending || isSubmitting}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              ref={(el) => setInputRef(el, i)}
              defaultValue={otpValue.split("")[i] || ""}
            />
          );
        })}
      </div>

      {otpError && (
        <p className="text-red-500 text-xs text-center mt-1">{otpError}</p>
      )}

      {/* Continue */}
      <Button
        type="submit"
        disabled={(otpValue || "").replace(/\D/g, "").length !== 6 || isSubmitting}
        className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-xs font-bold py-3 disabled:opacity-50"
      >
        {isSubmitting ? "Verifying..." : "Continue"}
      </Button>

      {/* Resend */}
      <div className="text-center text-gray-300 text-sm font-bold">
        {timer > 0 ? (
          <p>
            Resend OTP in{" "}
            <span className="text-purple-500">{timer}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="text-purple-500 font-bold disabled:opacity-50"
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>

      {/* Back */}
      <button
        type="button"
        className="flex items-center justify-center w-full text-white text-sm font-bold -mt-2"
        onClick={() => setView("login")}
      >
        <ChevronLeft size={18} className="text-purple-500" />
        Back to Login
      </button>
    </form>
  );
}

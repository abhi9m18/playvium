"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/store/auth-modal-store";
import { ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";

// Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotSchema,
  ForgotSchema,
} from "@/lib/validators/forgot.schema";

import { AuthAPI } from "@/api";
import { useAuthStore } from "@/store/auth-store";

export default function ForgotForm() {
  const { setView } = useAuthModal();
  const { resetPassword, forgotPassword } = useAuthStore((state) => state);
  const isLoading = useAuthStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotSchema>({
    resolver: zodResolver(forgotSchema),
  });

  const [loading, setLoading] = useState(false);
  /** Handle Forgot Password Submit */
  const onSubmit = async (data: ForgotSchema) => {
    try {
      setLoading(true);

      await forgotPassword(data.email);

      toast.success("OTP sent successfully");

      // Move to OTP verification screen
      setView("verify", { email: data.email, from: "forgot" });

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

      {/* Title */}
      <h2 className="text-2xl text-center sm:text-left font-extrabold text-white">
        Reset Password
      </h2>

      {/* Email Input */}
      <div>
        <Input
          {...register("email")}
          className="bg-[#191D24] border border-gray-800 rounded-lg text-gray-300 text-xs font-bold h-11 px-3"
          placeholder="Email / Phone Number"
        />

        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Send OTP */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-xs font-bold py-3"
      >
        {loading ? (
          <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent border-b-transparent" />
        ) : "Send OTP"}
      </Button>

      {/* Back to Login */}
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full text-white text-sm font-bold"
        onClick={() => setView("login")}
      >
        <ChevronLeft size={18} className="text-purple-500" />
        Back to Login
      </button>
    </form>
  );
}

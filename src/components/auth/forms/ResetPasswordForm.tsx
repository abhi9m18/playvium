"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthModal } from "@/store/auth-modal-store";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";

// Validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/lib/validators/reset.schema";

import { AuthAPI } from "@/api";
import { useAuthStore } from "@/store/auth-store";

export default function ResetPasswordForm() {
  const { setView, payload } = useAuthModal();
  const { resetPassword, forgotPassword } = useAuthStore((state) => state);
  const isLoading = useAuthStore((state) => state.isLoading);
  const entity = payload?.entity ?? "";
  const otp = payload?.otp ?? "";

  if (!entity || !otp) {
    toast.error("Missing reset data. Please restart the process.");
    return null;
  }

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  /** Handle final reset */
  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      setLoading(true);

      await resetPassword({
        entity,
        otp,
        newPassword: data.password,
      });

      toast.success("Password updated successfully");

      // Redirect to login screen
      setView("login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
      {/* Title */}
      <h2 className="text-2xl text-center sm:text-left font-extrabold text-white">
        Set New Password
      </h2>

      {/* New Password */}
      <div className="relative">
        <Input
          {...register("password")}
          type={showPass ? "text" : "password"}
          className="w-full bg-[#191D24] border-[#242B35] border rounded-lg text-white text-sm h-12 px-3 pr-10 focus-visible:ring-0"
          placeholder="New Password"
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <Input
          {...register("confirm")}
          type={showConfirm ? "text" : "password"}
          className="w-full bg-[#191D24] border-[#242B35] border rounded-lg text-white text-sm h-12 px-3 pr-10 focus-visible:ring-0"
          placeholder="Confirm New Password"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.confirm && (
          <p className="text-red-500 text-xs mt-1">{errors.confirm.message}</p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm font-semibold h-12"
      >
        {loading ? "Updating..." : "Update Password"}
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

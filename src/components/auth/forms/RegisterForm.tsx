"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthModal } from "@/store/auth-modal-store";
import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import SocialLogin from "./SocialLogin";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchema,
} from "@/lib/validators/register.schema";

import { useAuthStore } from "@/store/auth-store";
import { toast } from "react-hot-toast";

export default function RegisterForm() {
  const { setView } = useAuthModal();
  const { register: registerUser, isLoading } = useAuthStore();

  const [openReferral, setOpenReferral] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setServerError("");

    try {
      const payload = {
        entity: data.entity,
        password: data.password,
        isAgreedToTermsConditions: data.agreeTerms,
        referral: data.referral || null,
      };

      const result = await registerUser(payload);
      
      if (result.success) {
        toast.success(result.message || "Registration successful Please verify your OTP.");
        // Move to verify OTP screen with entity and origin
        setView("verify", { email: data.entity, from: "register" });
      } else {
        toast.error(result.message || "Registration failed!");
        setServerError(result.message || "Registration failed!");
      }
    } catch (err: any) {
      const message = err?.message || "Registration failed!";
      toast.error(message);
      setServerError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col h-full md:space-y-3 w-full">
      
      <h2 className="text-lg md:text-xl text-center  sm:text-left font-medium text-white">
        Sign Up
      </h2>

      {/* {serverError && (
        <p className="text-red-500 text-xs font-bold">{serverError}</p>
      )} */}

      {/* EMAIL */}
      <div className="">
        <Input
          {...register("entity")}
          className="bg-[#191D24] border border-gray-800 rounded-lg text-gray-300 text-xs font-bold h-11 px-3"
          placeholder="Email / Phone Number"
          disabled={isLoading}
        />
        {errors.entity && (
          <p className="text-red-500 text-xs mt-1">{errors.entity.message}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="relative ">
        <Input
          {...register("password")}
          type={showPass ? "text" : "password"}
          className="bg-[#191D24] border border-gray-800 rounded-lg text-gray-300 text-xs font-bold h-11 px-3 pr-10"
          placeholder="Password"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          disabled={isLoading}
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div className="relative ">
        <Input
          {...register("confirm")}
          type={showConfirm ? "text" : "password"}
          className="bg-[#191D24] border border-gray-800 rounded-lg text-gray-300 text-xs font-bold h-11 px-3 pr-10"
          placeholder="Confirm Password"
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          disabled={isLoading}
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.confirm && (
          <p className="text-red-500 text-xs mt-1">{errors.confirm.message}</p>
        )}
      </div>

      {/* REFERRAL */}
      <div className="space-y-2 mx-2 ">
        <div
          className="flex justify-between items-center cursor-pointer text-xs font-normal text-gray-400"
          onClick={() => !isLoading && setOpenReferral(!openReferral)}
        >
          <p>Enter Referral / Promo Code</p>
          {openReferral ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </div>

        {openReferral && (
          <div>
            <Input
              {...register("referral")}
              className="bg-[#191D24] border border-gray-800 rounded-lg text-gray-300 text-xs font-normal h-11 px-3"
              placeholder="Referral / Promo Code"
              disabled={isLoading}
            />
            {errors.referral && (
              <p className="text-red-500 text-xs mt-1">
                {errors.referral.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* TERMS */}
      <div className="space-y-3 mx-2 text-gray-400 text-[10px] md:text-[12px] font-normal">
        <label className="flex items-start gap-3">
          <Checkbox
            checked={watch("agreeTerms")}
            onCheckedChange={(v) => setValue("agreeTerms", v === true)}
            className="rounded-[3px] data-[state=checked]:bg-[#187BF0] data-[state=checked]:border-[#187BF0] mt-0.5 shrink-0"
            disabled={isLoading}
          />
          <span>I agree to the User Agreement & confirm I am at least 18 years old.</span>
        </label>

        {errors.agreeTerms && (
          <p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>
        )}

        <label className="flex  items-start gap-3 -mt-1">
          <Checkbox
            checked={watch("agreePromo")}
            onCheckedChange={(v) => setValue("agreePromo", v === true)}
            className="rounded-[3px] data-[state=checked]:bg-[#187BF0] data-[state=checked]:border-[#187BF0] mt-0.5 shrink-0"
            disabled={isLoading}
          />
          <span>I agree to receive marketing promotions.</span>
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-[#187BF0] hover:bg-[#1469D4] rounded-lg text-white text-xs font-bold py-3 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? (
          <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent border-b-transparent" />
        ) : (
          "Sign Up"
        )}
      </Button>

      {/* SWITCH TO LOGIN */}
      <p className="flex justify-start mx-2 text-white text-[14px] font-normal gap-2">
        Already have an account?
        <button
          type="button"
          className="text-[#187BF0] hover:text-[#1469D4] transition-colors disabled:opacity-50"
          onClick={() => setView("login")}
          disabled={isLoading}
        >
          Sign In
        </button>
      </p>

      <div className="mt-auto pb-10 md:pb-4">
      <SocialLogin/>
      </div>
    </form>
  );
}
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import SocialLogin from "./SocialLogin";

import { useAuthModal } from "@/store/auth-modal-store";
import { useAuthStore } from "@/store/auth-store";
import { toast } from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/validators/auth.schema";

export default function LoginForm() {
  const { setView, closeModal } = useAuthModal();

  const { login, isAuthenticated } = useAuthStore((state) => state);
  const isLoading = useAuthStore((state) => state.isLoading);

  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  /** Login Handler */
  const onSubmit = async (data: LoginSchema) => {
    try {
      const user = await login({
        entity: data.entity,
        password: data.password,
      });


      if (!user?.success) {
        toast.error("Login Faild.");
        // setView("verify", { email: user.entity });
        return;
      }
      toast.success("Login successful");
      closeModal()
      // window.location.href = "/profile";
    } catch (err: any) {
      toast.error(err?.message || "Invalid login credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full flex flex-col h-full">
      <h2 className="text-lg md:text-xl text-center  sm:text-left font-medium text-white">
        Sign In
      </h2>

      {/* Entity (Email or Phone) */}
      <div>
        <Input
          {...register("entity")}
          className="bg-[#191D24] border border-gray-700 rounded-lg text-gray-300 text-sm h-11 px-3"
          placeholder="Email / Phone"
        />
        {errors.entity && (
          <p className="text-red-500 text-xs mt-1">{errors.entity.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="relative">
        <Input
          {...register("password")}
          type={showPass ? "text" : "password"}
          className="bg-[#191D24] border border-gray-700 rounded-lg text-gray-300 text-sm h-11 px-3 pr-10"
          placeholder="Password"
        />

        <button
          type="button"
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        >
          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Forgot Password */}
      <div className="text-right text-gray-400 text-xs font-medium -mt-2">
        <button type="button" onClick={() => setView("forgot")}>
          Forgot your password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm font-bold py-3 flex items-center justify-center"
      >
        {isLoading ? (
          <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent border-b-transparent" />
        ) : (
          "Sign In"
        )}
      </Button>

      <p className="flex justify-start text-white text-sm gap-2">
        New to Wulf Casino?
        <button
          type="button"
          className="text-purple-500 font-bold"
          onClick={() => setView("register")}
        >
          Create account
        </button>
      </p>

       <div className="mt-auto pb-10 md:pb-4">
    <SocialLogin />
  </div>
    </form>
  );
}

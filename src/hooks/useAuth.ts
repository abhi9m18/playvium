"use client";

import { useState } from "react";
import { AuthAPI, SocialAPI } from "@/api";
import { setTokens, clearTokens } from "@/lib/storage";
import { RegisterPayload } from "@/api/auth/auth.types";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  // LOGIN
  const login = async (identifier: string, password: string) => {
    setLoading(true);
    try {
      const res = await AuthAPI.login({ entity: identifier, password });
      setTokens(res.accessToken, res.refreshToken);
      return res.user;
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    try {
      const res = await AuthAPI.register(payload);
      return res;
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setLoading(true);
    try {
      return await AuthAPI.verifyOtp({ entity: email, otp });
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (entity: string) => {
    setLoading(true);
    try {
      return await AuthAPI.resendOtp({ entity });
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (entity: string) => {
    setLoading(true);
    try {
      return await AuthAPI.forgotPassword({ entity });
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    entity: string,
    otp: string,
    newPassword: string
  ) => {
    setLoading(true);
    try {
      return await AuthAPI.resetPassword({
        entity,
        otp,
        newPassword,
      });
    } catch (err: any) {
      throw err?.response?.data || err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthAPI.logout();
    } catch {}

    clearTokens();
    toast.success("Logout successful");

    if (typeof window !== "undefined") window.location.href = "/";
  };
  // Social Login
  const loginWithGoogle = async (idToken: string) => {
    setLoading(true);
    try {
      const res = await SocialAPI.googleAuth({ token: idToken });
      setTokens(res.token, null); 

      toast.success(`Welcome ${res.user.entity}!`);
      window.location.href = "/";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const loginWithFacebook = async (accessToken: string) => {
    setLoading(true);
    try {
      const res = await SocialAPI.facebookAuth({ accessToken });
      setTokens(res.token, null);
      toast.success(`Welcome ${res.user?.entity || "User"}!`);
      if (typeof window !== "undefined") window.location.href = "/profile";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Facebook login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const loginWithTelegram = async (authData: any) => {
    setLoading(true);
    try {
      const res = await SocialAPI.telegramAuth({ authData });
      setTokens(res.token, null);
      toast.success(`Welcome ${res.user?.entity || "User"}!`);
      if (typeof window !== "undefined") window.location.href = "/";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Telegram login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const loginWithTwitter = async (
    oauth_token: string,
    oauth_verifier: string
  ) => {
    setLoading(true);
    try {
      const res = await SocialAPI.twitterAuth({ oauth_token, oauth_verifier });
      setTokens(res.token, null);
      toast.success(`Welcome ${res.user?.entity || "User"}!`);
      if (typeof window !== "undefined") window.location.href = "/dashboard";
      return res;
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Twitter login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  /* WHATSAPP SEND OTP */
  const whatsappSendOtp = async (phone: string) => {
    setLoading(true);
    try {
      const res = await SocialAPI.whatsappSendOtp({ phone });

      toast.success(res.message || "OTP sent to WhatsApp");

      return res; // Useful for UI if needed
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to send WhatsApp OTP"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /* WHATSAPP VERIFY OTP */
  const whatsappVerifyOtp = async (phone: string, otp: string) => {
    setLoading(true);
    try {
      const res = await SocialAPI.whatsappVerifyOtp({ phone, otp });

      setTokens(res.token, null);

      toast.success(`Welcome ${res.user?.entity || "User"}!`);

      if (typeof window !== "undefined") window.location.href = "/dashboard";

      return res;
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to verify WhatsApp OTP"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    register,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    loginWithTelegram,
    loginWithTwitter,
    whatsappSendOtp,
    whatsappVerifyOtp,
  };
};

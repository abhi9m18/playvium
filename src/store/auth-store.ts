// src/store/auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setTokens, clearTokens, getAccessToken } from "@/lib/storage";
import * as authApi from "@/api/auth/auth.api";
import * as socialApi from "@/api/auth/social.api";
import type { UserModel } from "@/api/auth/auth.types";
import toast from "react-hot-toast";

interface AuthState {
  user: UserModel | null;
  token: string | null;
  isAuthenticated: string;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  register: (data: {
    entity: string;
    password: string;
    isAgreedToTermsConditions: boolean;
    referral?: string | null;
  }) => Promise<{ success: boolean; message?: string }>;

  verifyOtp: (data: {
    entity: string;
    otp: string;
  }) => Promise<{ success: boolean; message?: string }>;

  verifyResetOtp: (data: {
    entity: string;
    otp: string;
  }) => Promise<{ success: boolean; message?: string }>;

  resendOtp: (
    entity: string
  ) => Promise<{ success: boolean; message?: string }>;

  login: (data: {
    entity: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;

  googleAuth: (
    idToken: string
  ) => Promise<{ success: boolean; message?: string }>;

  facebookAuth: (
    accessToken: string
  ) => Promise<{ success: boolean; message?: string }>;

  telegramAuth: (
    authData: any
  ) => Promise<{ success: boolean; message?: string }>;

  forgotPassword: (
    entity: string
  ) => Promise<{ success: boolean; message?: string }>;

  resetPassword: (data: {
    entity: string;
    otp: string;
    newPassword: string;
  }) => Promise<{ success: boolean; message?: string }>;

  logout: () => Promise<void>;

  initializeAuth: () => void;

  clearError: () => void;

  setUser: (user: UserModel | null) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: "unauthenticated",
      isLoading: false,
      error: null,

      initializeAuth: () => {
        const token = getAccessToken();
        if (token) {
          set({ token, isAuthenticated: "authenticated" });
        }
      },

      register: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.register(data);
          set({ isLoading: false });
          return { success: true, message: result.message };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },

      verifyOtp: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.verifyOtp(data);
          const { accessToken, user } = result;

          setTokens(accessToken, null);
          set({
            user,
            token: accessToken,
            isAuthenticated: "authenticated", // FIXED: was 'uthenticated'
            isLoading: false,
          });

          return { success: true, message: result.message };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "OTP verification failed";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },
      verifyResetOtp: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.verifyResetOtp(data);
          return { success: true, message: result.message };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "OTP verification failed";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },

      resendOtp: async (entity) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.resendOtp({ entity });
          set({ isLoading: false });
          return { success: true, message: result.message };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to resend OTP";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },

      login: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.login(data);
          const { accessToken, refreshToken, user } = result;

          setTokens(accessToken, refreshToken);
          set({
            user,
            token: accessToken,
            isAuthenticated: "authenticated",
            isLoading: false,
          });
          
          document.cookie = `auth-token=${accessToken}; path=/; max-age=${
            60 * 60 * 24 * 7
          }`; // 7 days
          return { success: true };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },

      googleAuth: async (authCode) => {
        set({ isLoading: true, error: null });
        try {
          const result = await socialApi.googleAuth({ token: authCode });
          const { token, user } = result;

          setTokens(token, null);
          set({
            user,
            token,
            isAuthenticated: "authenticated",
            isLoading: false,
          });
          toast.success(`Welcome ${user.entity}!`);
          return {
            success: true,
            message: `Google ${result.action} successful`,
          };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Google authentication failed";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },
      facebookAuth: async (accessToken: string) => {
        set({ isLoading: true, error: null });

        try {
          const result = await socialApi.facebookAuth({ accessToken });
          const { token, user } = result;

          // Save tokens
          setTokens(token, null);

          // Update Zustand state
          set({
            user,
            token,
            isAuthenticated: "authenticated",
            isLoading: false,
          });

          console.log({
            user,
            token,
            isAuthenticated: "authenticated",
            isLoading: false,
          });

          toast.success(`Welcome ${user?.entity || "User"}!`);

          return {
            success: true,
            message: `Facebook ${result.action || "login"} successful`,
          };
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "Facebook authentication failed";

          set({ isLoading: false, error: errorMessage });

          return { success: false, message: errorMessage };
        }
      },

      telegramAuth: async (
        authData: any
      ): Promise<{ success: boolean; message?: string }> => {
        set({ isLoading: true, error: null });

        try {
          const result = await socialApi.telegramAuth({ authData });

          const { token, user } = result;

          // Save tokens
          setTokens(token, null);

          // Update Zustand state
          set({
            user,
            token,
            isAuthenticated: "authenticated",
            isLoading: false,
          });

          toast.success(`Welcome ${user?.entity || "User"}!`);

          return {
            success: true,
            message: `Telegram ${result.action || "login"} successful`,
          };
        } catch (error: any) {
          const errorMessage =
            error?.response?.data?.message ||
            error.message ||
            "Telegram authentication failed";

          set({ isLoading: false, error: errorMessage });

          return { success: false, message: errorMessage };
        }
      },

      forgotPassword: async (entity) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.forgotPassword({ entity });
          set({ isLoading: false });
          return { success: true, message: result.message };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to send reset OTP";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },

      resetPassword: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const result = await authApi.resetPassword(data);
          set({ isLoading: false });
          return { success: true, message: result.message };
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Password reset failed";
          set({ isLoading: false, error: errorMessage });
          return { success: false, message: errorMessage };
        }
      },

      logout: async () => {
        set({ isLoading: true });
        try {
          const token = get().token;
          if (token) {
            await authApi.logout();
          }
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          clearTokens();
          set({
            user: null,
            token: null,
            isAuthenticated: "unauthenticated",
            isLoading: false,
            error: null,
          });
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        }
      },

      clearError: () => set({ error: null }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);


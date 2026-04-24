import api from "../config/axios.config";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpPayload,
  ResendOtpPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "./auth.types";

// LOGIN
export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};

// REGISTER
export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// VERIFY OTP
export const verifyOtp = async (data: VerifyOtpPayload) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

export const verifyResetOtp = async (data: VerifyOtpPayload) => {
  const res = await api.post("/auth/reset-verify-otp", data);
  return res.data;
};

// RESEND OTP
export const resendOtp = async (data: ResendOtpPayload) => {
  const res = await api.post("/auth/resend-otp", data);
  return res.data;
};

// FORGOT PASSWORD
export const forgotPassword = async (data: ForgotPasswordPayload) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};

// RESET PASSWORD
export const resetPassword = async (data: ResetPasswordPayload) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};

// LOGOUT
export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// REFRESH TOKEN
export const refreshToken = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", { refreshToken });
  return res.data;
};

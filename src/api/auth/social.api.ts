import api from "../config/axios.config";
// Google Auth 
export const googleAuth = async (data: { token: string }) => {
  return (await api.post("/auth/google", data)).data;
};
// Facebook Auth 
export const facebookAuth = async (payload: { accessToken: string }) => {
  return (await api.post("/auth/facebook", payload)).data;
};
// Telegram Auth
export const telegramAuth = async (payload: { authData: any }) => {
  return (await api.post("/auth/telegram", payload)).data;
};
// WhatsApp OTP: Send OTP
export const whatsappSendOtp = async (payload: { phone: string }) => {
  return (await api.post("/auth/whatsapp/send-otp", payload)).data;
};
// WhatsApp OTP: Verify OTP
export const whatsappVerifyOtp = async (payload: { phone: string; otp: string }) => {
  return (await api.post("/auth/whatsapp/verify-otp", payload)).data;
};
// Twitter / X auth (oauth_token + oauth_verifier)
export const twitterAuth = async (payload: { oauth_token: string; oauth_verifier: string }) => {
  return (await api.post("/auth/twitter", payload)).data;
};
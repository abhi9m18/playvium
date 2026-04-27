// DUMMY SOCIAL AUTH - FRONTEND ONLY - NO BACKEND API CALLS

// Generate dummy tokens
const generateDummyToken = (identifier: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: identifier,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  }));
  const signature = btoa("dummy-signature");
  return `${header}.${payload}.${signature}`;
};

// Generate dummy user
const generateDummyUser = (identifier: string, provider: string) => {
  const now = new Date(0).toISOString(); // Use fixed date to avoid hydration issues
  return {
    id: `user_${Math.random().toString(36).substr(2, 9)}`,
    entity: identifier,
    [provider === "google" ? "googleAuthId" : "socialAuthId"]: `${provider}_${Math.random().toString(36).substr(2, 9)}`,
    isActive: true,
    isVerified: true,
    isPremium: false,
    isAgreedToTermsConditions: true,
    createdAt: now,
    updatedAt: now,
  };
};

// Google Auth - DUMMY
export const googleAuth = async (data: { token: string }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = generateDummyUser(`google_user_${Date.now()}`, "google");
  const token = generateDummyToken(user.entity);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${token}`);
  }

  return {
    action: "login",
    token,
    user,
  };
};

// Facebook Auth - DUMMY
export const facebookAuth = async (payload: { accessToken: string }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = generateDummyUser(`facebook_user_${Date.now()}`, "facebook");
  const token = generateDummyToken(user.entity);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${token}`);
  }

  return {
    action: "login",
    token,
    user,
  };
};

// Telegram Auth - DUMMY
export const telegramAuth = async (payload: { authData: any }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = generateDummyUser(`telegram_user_${Date.now()}`, "telegram");
  const token = generateDummyToken(user.entity);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${token}`);
  }

  return {
    action: "login",
    token,
    user,
  };
};

// WhatsApp OTP: Send OTP - DUMMY
export const whatsappSendOtp = async (payload: { phone: string }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    message: "OTP sent to WhatsApp",
    phone: payload.phone,
  };
};

// WhatsApp OTP: Verify OTP - DUMMY
export const whatsappVerifyOtp = async (payload: { phone: string; otp: string }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const user = generateDummyUser(payload.phone, "whatsapp");
  const token = generateDummyToken(user.entity);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${token}`);
  }

  return {
    message: "OTP verified",
    token,
    user,
  };
};

// Twitter / X auth (oauth_token + oauth_verifier) - DUMMY
export const twitterAuth = async (payload: { oauth_token: string; oauth_verifier: string }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = generateDummyUser(`twitter_user_${Date.now()}`, "twitter");
  const token = generateDummyToken(user.entity);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${token}`);
  }

  return {
    action: "login",
    token,
    user,
  };
};
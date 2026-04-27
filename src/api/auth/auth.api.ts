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

// DUMMY AUTH - FRONTEND ONLY - NO BACKEND API CALLS

// Generate dummy tokens
const generateDummyToken = (entity: string): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: entity,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  }));
  const signature = btoa("dummy-signature");
  return `${header}.${payload}.${signature}`;
};

// Generate dummy user object
const generateDummyUser = (entity: string) => {
  const now = new Date(0).toISOString(); // Use fixed date to avoid hydration issues
  return {
    id: `user_${Math.random().toString(36).substr(2, 9)}`,
    entity,
    googleAuthId: undefined,
    isActive: true,
    isVerified: true,
    isPremium: false,
    isAgreedToTermsConditions: true,
    createdAt: now,
    updatedAt: now,
  };
};

// LOGIN - DUMMY
export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const accessToken = generateDummyToken(data.entity);
  const refreshToken = generateDummyToken(`refresh_${data.entity}`);
  const user = generateDummyUser(data.entity);

  // Set authorization header for future requests
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${accessToken}`);
  }

  return { accessToken, refreshToken, user };
};

// REGISTER - DUMMY
export const register = async (data: RegisterPayload): Promise<RegisterResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = generateDummyUser(data.entity);

  return {
    message: "Registration successful",
    user,
  };
};

// VERIFY OTP - DUMMY
export const verifyOtp = async (data: VerifyOtpPayload) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const accessToken = generateDummyToken(data.entity);
  const user = generateDummyUser(data.entity);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${accessToken}`);
  }

  return {
    message: "OTP verified",
    accessToken,
    user,
  };
};

export const verifyResetOtp = async (data: VerifyOtpPayload) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    verified: true,
    message: "Reset OTP verified",
  };
};

// RESEND OTP - DUMMY
export const resendOtp = async (data: ResendOtpPayload) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    message: "OTP resent successfully",
  };
};

// FORGOT PASSWORD - DUMMY
export const forgotPassword = async (data: ForgotPasswordPayload) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    message: "Password reset OTP sent",
  };
};

// RESET PASSWORD - DUMMY
export const resetPassword = async (data: ResetPasswordPayload) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    message: "Password reset successful",
  };
};

// LOGOUT - DUMMY
export const logout = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-header");
  }

  return {
    message: "Logout successful",
  };
};

// REFRESH TOKEN - DUMMY
export const refreshToken = async (refreshToken: string) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const newAccessToken = generateDummyToken(`refreshed_${Date.now()}`);

  if (typeof window !== "undefined") {
    localStorage.setItem("auth-header", `Bearer ${newAccessToken}`);
  }

  return {
    accessToken: newAccessToken,
    refreshToken,
  };
};

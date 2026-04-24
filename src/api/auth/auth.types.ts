
// LOGIN
export interface LoginPayload {
  entity: string;          
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserModel;
}

// USER MODEL 
export interface UserModel {
  id: string;
  entity: string;
  googleAuthId?: string;
  isActive: boolean;
  isVerified: boolean;
  isPremium: boolean;
  isAgreedToTermsConditions: boolean;
  createdAt: string;
  updatedAt: string;
}

// REGISTER
export interface RegisterPayload {
  entity: string; // ← identifier
  password: string;
  isAgreedToTermsConditions: boolean;
  referral?: string | null;
}

export interface RegisterResponse {
  message: string;
  user: UserModel;
}

// OTP
export interface VerifyOtpPayload {
  entity: string;
  otp: string;
}

export interface ResendOtpPayload {
  entity: string;
}

// PASSWORD RESET
export interface ForgotPasswordPayload {
  entity: string;
}

export interface ResetPasswordPayload {
  entity: string;
  otp: string;
  newPassword: string;
}

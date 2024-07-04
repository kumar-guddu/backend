export interface IUser {
  id: number;
  name: string | null;
  email: string;
  passwordHash: string | null;
  isActive: boolean;
  lastLoginDate: Date | null;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  googleOauthId: string | null;
  // Optionally include related entities if needed in the interface
  // otps: OTP[];  // Include this if you often work with user's OTPs directly
}


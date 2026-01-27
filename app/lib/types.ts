export interface User {
  email: string;
  isRegistered: boolean;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  success: boolean;
  authenticated: boolean;
  data: User | null;
}

// NOTE : Shared UserRoleEnum from backend for usable
export const UserRoleEnum = ["RESERVER", "ADMIN"] as const;
export type UserRoleEnum = typeof UserRoleEnum[number];

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  prefix: string;
  isUniStudent: boolean;
  faculty?: string;
  role: UserRoleEnum;
  phone: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: User;
}

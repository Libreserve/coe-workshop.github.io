export interface User {
  email: string;
  isRegistered: boolean;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  success: boolean;
  authenticated: boolean;
  user: User | null;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: User;
}

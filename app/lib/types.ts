export interface User {
    email: string;
    isRegistered: boolean;
}

export interface AuthResponse {
    success: boolean;
    authenticated: boolean;
    user: User | null;
}

export interface RegisterData {
    firstName: string;
    lastName: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
    error?: string;
    user?: {
        email: string;
        firstName: string;
        lastName: string;
    };
}
export interface User {
    googleId: string;
    email: string;
    name: string;
    picture: string;
}

export interface AuthResponse {
    success: boolean;
    authenticated: boolean;
    user: User | null;
}
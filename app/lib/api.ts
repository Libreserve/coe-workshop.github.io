import {AuthResponse} from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// api ดึงข้อมูล
export async function getCurrentUser():Promise<AuthResponse> {
    try {
        const res = await fetch(`${API_URL}/api/user`,{
            credentials: 'include',
        });

        if (!res.ok) {
            return { success: false, authenticated: false, user: null };
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        return { success: false, authenticated: false, user: null };
    }

}

// Logout
export async function logout(): Promise<void> {
    try {
        await fetch(`${API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

export function getLoginUrl(): string {
    return `${API_URL}/api/auth/google`;
}

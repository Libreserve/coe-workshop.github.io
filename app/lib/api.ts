import { AuthResponse } from "@/app/lib/types";
import { isAdminRoute } from "../utils/isAdminRoute";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function getCurrentUser(): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/v1/user/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      return { success: false, data: null };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, data: null };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_URL}/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export function getLoginUrl(): string {
  return isAdminRoute ? "/admin/login" : `${API_URL}/v1/auth`;
}

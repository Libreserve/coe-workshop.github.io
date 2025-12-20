import {
  AuthResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/app/lib/types";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// api ดึงข้อมูล
export async function getCurrentUser(): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_URL}/v1/user/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      return { success: false, authenticated: false, data: null };
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, authenticated: false, data: null };
  }
}

export async function logout(): Promise<void> {
  try {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export async function registerUser(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  try {
    const res = await fetch(`${API_URL}/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "Network error occurred",
    };
  }
}

export function getLoginUrl(): string {
  return `${API_URL}/v1/auth`;
}

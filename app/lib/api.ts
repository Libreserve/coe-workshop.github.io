import { AuthResponse } from "@/app/lib/types";

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
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

export async function createItem(): Promise<void> {
  try {
    await fetch(`${API_URL}/v1/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name: "test7",
        description: "string",
        categoryName: "MACHINE",
        image_url: "string",
      }),
    });
  } catch {
  }
}

export function getLoginUrl(): string {
  return `${API_URL}/v1/auth`;
}

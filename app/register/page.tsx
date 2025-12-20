"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext/AuthContext";
import { AuthContext } from "@/app/Context/AuthContext/AuthContext";
import { registerUser } from "@/app/lib/api";
import { RegisterResponse } from "@/app//lib/types";

export default function RegisterPage() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("useAuth must be used within AuthProvider");
    return (
      <div>
        <h1>error modal</h1>
        <h2>Authentication Error</h2>
        <p>Please ensure this page is wrapped with AuthProvider</p>
        <button onClick={() => router.push("/")}>back</button>
      </div>
    );
  }

  const { user, authenticated, loading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/");
      return;
    }
    if (user.isRegistered) router.push("/");
  }, [loading, authenticated, user, router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError('');

    if (!firstName.trim() || !lastName.trim()) {
      // setError('กรุณากรอกชื่อและนามสกุล');
      return;
    }

    setSubmitting(true);

    try {
      const result: RegisterResponse = await registerUser({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        faculty: "test",
        role: "RESERVER",
        phone: "1234567890",
      });

      if (result.success) {
        router.push("/");
        window.location.reload();
      } else {
        // setError(result.error || 'เกิดข้อผิดพลาด');
      }
    } catch {
      // setError('เกิดข้อผิดพลาดในการลงทะเบียน');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>กำลังโหลด...</div>;
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div>
      <div>
        <p>Email: {user?.email}</p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">ชื่อ</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ชื่อ"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label htmlFor="lastName">นามสกุล</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="นามสกุล"
              required
              disabled={submitting}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
          </button>
        </form>
      </div>
    </div>
  );
}

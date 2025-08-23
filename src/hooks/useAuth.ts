import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// Hook to check if first admin exists
export function useFirstAdminCheck() {
  const [checking, setChecking] = useState(true);
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch(`${API_URL}/auth/check-first-admin`);
        if (!res.ok) throw new Error("Failed to check first admin");
        const data = await res.json();
        setExists(data.exists);
      } catch (err) {
        console.error("Failed to check first admin:", err);
        console.warn("Assuming first admin exists due to error.");
        setExists(true);
      } finally {
        setChecking(false);
      }
    }
    check();
  }, []);

  return { checking, exists };
}

// Login function for normal users or admins
export async function login(
  emailOrUsername: string,
  password: string,
  adminSecret?: string
) {
  const body: { emailOrUsername: string; password: string; adminSecret?: string } = {
    emailOrUsername,
    password,
  };
  if (adminSecret) body.adminSecret = adminSecret;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Login failed");

  return data;
}

// Optional: register first admin
export async function registerFirstAdmin(
  username: string,
  email: string,
  password: string,
  adminSecret: string
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, role: "admin", adminSecret }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Failed to register first admin");

  return data;
}

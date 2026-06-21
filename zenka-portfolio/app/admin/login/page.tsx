"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] w-full max-w-sm flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-white">Admin Login</h2>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-[var(--text-muted)]">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--bg-hover)] border border-[#241e52] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm text-[var(--text-muted)]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[var(--bg-hover)] border border-[#241e52] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#8b7ff5] hover:opacity-90 text-white font-semibold py-2 px-4 rounded-lg transition-opacity"
        >
          Login
        </button>
      </form>
    </div>
  );
}

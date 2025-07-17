"use client";

import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed: " + res?.error || "Unknown error");
    }
  };

  return (
    <AuthLayout>
      <div>
        <span>Welcome back to</span>
        <h1 className="font-bold">Password Manager</h1>
        <span>Login to manage your passwords.</span>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Username"
            required
            className="w-full"
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full"
          />
        </div>
        <button type="submit" className="cursor-pointer">
          Login
        </button>
      </form>
      <span>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="underline">
          Sign up for free
        </Link>
      </span>
    </AuthLayout>
  );
}

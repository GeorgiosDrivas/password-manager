"use client";

import AuthLayout from "@/src/components/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const error = await res.text();
      alert("Signup failed: " + error);
    }
  };

  return (
    <AuthLayout>
      <div>
        <span>Welcome to</span>
        <h1 className="font-bold">Password Manager</h1>
        <span>Safely store your passwords with ease.</span>
      </div>
      <form onSubmit={handleSignup}>
        <div>
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?{" "}
        <Link href="/" className="underline">
          Log in
        </Link>
      </span>
    </AuthLayout>
  );
}

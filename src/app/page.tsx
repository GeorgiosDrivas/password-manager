"use client";

import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username: loginCredentials.username,
      password: loginCredentials.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard/items");
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
      <form onSubmit={handleLogin} className="mt-5">
        <div>
          <input
            value={loginCredentials.username}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                username: e.target.value,
              })
            }
            type="text"
            placeholder="Username"
            required
            className="w-full"
          />
        </div>
        <div>
          <input
            value={loginCredentials.password}
            onChange={(e) =>
              setLoginCredentials({
                ...loginCredentials,
                password: e.target.value,
              })
            }
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

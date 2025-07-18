"use client";

import AuthLayout from "@/src/components/AuthLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [signUpCredentials, setSignUpCredentials] = useState({
    name: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: signUpCredentials.name,
        username: signUpCredentials.username,
        password: signUpCredentials.password,
      }),
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
            value={signUpCredentials.name}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
                name: e.target.value,
              })
            }
          />
        </div>
        <div>
          <input
            value={signUpCredentials.username}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
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
            value={signUpCredentials.password}
            onChange={(e) =>
              setSignUpCredentials({
                ...signUpCredentials,
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

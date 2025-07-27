"use client";

import Link from "next/link";
import AuthLayout from "../components/AuthLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { loginSchema, LoginSchemaType } from "../schemas/userLoginSchema";

export default function Login() {
  const [loginCredentials, setLoginCredentials] = useState<LoginSchemaType>({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const schemaValidation = loginSchema.safeParse(loginCredentials);

    if (!schemaValidation.success) {
      alert("Error: " + schemaValidation.error.message);
      return;
    }

    try {
      const res = await signIn("credentials", {
        username: loginCredentials.username,
        password: loginCredentials.password,
        redirect: false,
      });

      if (!res?.ok) {
        alert("Login failed: " + res?.error || "Unknown error");
        return;
      }

      router.push("/dashboard/items");
    } catch (error) {
      console.error(`Login error: ${error}`);
    }
  };

  return (
    <AuthLayout>
      <>
        <div>
          <span className="fira-sans-light">Welcome back to</span>
          <h1 className="rubik-head-medium">Password Manager</h1>
          <span className="fira-sans-light">
            Login to manage your passwords.
          </span>
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
          <button
            type="submit"
            className="cursor-pointer btn-hover fira-sans-medium"
          >
            Login
          </button>
        </form>
        <span className="fira-sans-light">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline fira-sans-medium">
            Sign up for free
          </Link>
        </span>
      </>
    </AuthLayout>
  );
}

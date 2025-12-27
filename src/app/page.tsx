"use client";

import Link from "next/link";
import LoginSignUpLayout from "../components/LoginSignUpLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";
import { loginSchema, LoginSchemaType } from "../schemas/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import HidePassword from "@/src/components/hidePassword";
import ShowPassword from "@/src/components/showPassword";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin =
    (setLoading: (value: boolean) => void) => async (data: LoginSchemaType) => {
      try {
        setLoading(true);
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
          callbackUrl: "/dashboard/items",
        });

        if (!res?.ok) {
          setLoading(false);
          alert("Login failed: " + (res?.error || "Unknown error"));
          return;
        }

        router.push("/dashboard/items");
      } catch (error) {
        console.error(`Login error: ${error}`);
      }
    };

  return (
    <LoginSignUpLayout>
      {(setLoading) => (
        <>
          <div>
            <span className="fira-sans-light">Welcome back to</span>
            <h1 className="rubik-head-medium">Password Manager</h1>
            <span className="fira-sans-light">
              Login to manage your passwords.
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleLogin(setLoading))}
            className="mt-5"
          >
            <div>
              <input
                {...register("username")}
                className="w-full mb-2"
                placeholder="Username"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full mb-2"
              />
              <div
                className="show-hide-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HidePassword /> : <ShowPassword />}
              </div>
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="cursor-pointer btn-hover fira-sans-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
          </form>
          <span className="fira-sans-light">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline fira-sans-medium">
              Sign up for free
            </Link>
          </span>
        </>
      )}
    </LoginSignUpLayout>
  );
}

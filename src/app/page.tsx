"use client";

import Link from "next/link";
import LoginSignUpLayout from "../components/LoginSignUpLayout";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";
import { loginSchema, LoginSchemaType } from "../schemas/loginSchema";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<LoginSchemaType>();

  const handleLogin =
    (setLoading: (value: boolean) => void) => async (data: LoginSchemaType) => {
      setLoading(true);

      const schemaValidation = loginSchema.safeParse(data);
      if (!schemaValidation.success) {
        setLoading(false);
        alert("Error: " + schemaValidation.error.message);
        return;
      }

      try {
        const res = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (!res?.ok) {
          setLoading(false);
          alert("Login failed: " + (res?.error || "Unknown error"));
          return;
        }

        router.push("/dashboard/items");
      } catch (error) {
        console.error(`Login error: ${error}`);
      } finally {
        setLoading(false);
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
                {...register("username", { required: true })}
                className="w-full"
              />
            </div>
            <div>
              <input
                type="password"
                {...register("password", { required: true })}
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
      )}
    </LoginSignUpLayout>
  );
}

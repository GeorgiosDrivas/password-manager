"use client";

import LoginSignUpLayout from "@/src/components/LoginSignUpLayout";
import { SignupSchemaType, signupSchema } from "@/src/schemas/signupSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [signUpCredentials, setSignUpCredentials] = useState<SignupSchemaType>({
    name: "",
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>,
    setLoading: (value: boolean) => void
  ) => {
    e.preventDefault();
    setLoading(true);
    const schemaValidation = signupSchema.safeParse(signUpCredentials);

    if (!schemaValidation.success) {
      setLoading(false);
      alert(`Error ${schemaValidation.error.message}`);
      return;
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: signUpCredentials.name,
          username: signUpCredentials.username,
          password: signUpCredentials.password,
        }),
      });

      if (!res.ok) {
        setLoading(false);
        console.error("Server error:", await res.text());
        return;
      }

      router.push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Error: ${error}`);
    }
  };

  return (
    <LoginSignUpLayout>
      {(setLoading) => (
        <>
          <div>
            <span className="fira-sans-light">Welcome to</span>
            <h1 className="rubik-head-medium">Password Manager</h1>
            <span className="fira-sans-light">
              Safely store your passwords with ease.
            </span>
          </div>
          <form
            onSubmit={(e) => {
              handleSignup(e, setLoading);
            }}
            className="mt-5"
          >
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
            <button
              type="submit"
              className="cursor-pointer fira-sans-medium btn-hover"
            >
              Sign Up
            </button>
          </form>
          <span className="fira-sans-light">
            Already have an account?{" "}
            <Link href="/" className="underline fira-sans-medium">
              Log in
            </Link>
          </span>
        </>
      )}
    </LoginSignUpLayout>
  );
}

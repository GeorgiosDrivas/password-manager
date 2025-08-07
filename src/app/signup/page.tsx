"use client";

import LoginSignUpLayout from "@/src/components/LoginSignUpLayout";
import { SignupSchemaType, signupSchema } from "@/src/schemas/signupSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchemaType>();

  const handleSignup =
    (setLoading: (value: boolean) => void) =>
    async (data: SignupSchemaType) => {
      setLoading(true);
      const schemaValidation = signupSchema.safeParse(data);

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
            ...data,
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
            onSubmit={handleSubmit(handleSignup(setLoading))}
            className="mt-5"
          >
            <div>
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="w-full"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
              <input
                {...register("name", { required: true })}
                placeholder="Username"
                className="w-full"
              />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Password"
                className="w-full"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            <button
              type="submit"
              className="cursor-pointer fira-sans-medium btn-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Loading" : "Sign Up"}
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

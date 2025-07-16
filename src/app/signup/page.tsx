import AuthLayout from "@/src/components/AuthLayout";
import Link from "next/link";

export default function Signup() {
  return (
    <AuthLayout>
      <div>
        <span>Welcome to</span>
        <h1 className="font-bold">Password Manager</h1>
        <span>Safely store your passwords with ease.</span>
      </div>
      <form>
        <div>
          <input
            type="text"
            placeholder="Username"
            required
            className="w-full"
          />
        </div>
        <div>
          <input
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

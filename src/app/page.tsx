import Link from "next/link";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  return (
    <AuthLayout>
      <div>
        <span>Welcome back to</span>
        <h1 className="font-bold">Password Manager</h1>
        <span>Login to manage your passwords.</span>
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

import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-2 h-screen p-5">
        <section
          id="login-section"
          className="flex justify-center items-start flex-col"
        >
          <div>
            <span>Welcome to</span>
            <h1 className="font-bold">Password Manager</h1>
            <span>Safely store your passwords with ease.</span>
          </div>
          <form>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                required
                className="w-full"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                className="w-full"
              />
            </div>
            <button type="submit" className="cursor-pointer">
              Login
            </button>
          </form>
          <span id="signup-link">
            Don't hane an account?{" "}
            <a href="/signup" className="underline">
              Sign up for free
            </a>
          </span>
        </section>
        <section className="relative w-full h-full rounded-4xl overflow-hidden">
          <Image src={"/login_img.webp"} alt="Login Image" fill />
        </section>
      </div>
    </>
  );
}

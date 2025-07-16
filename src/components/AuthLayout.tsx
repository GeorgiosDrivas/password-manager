import { ReactNode } from "react";
import LandingImage from "./LandingImage";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 h-screen p-5">
      <section
        id="login-section"
        className="flex justify-center items-start flex-col"
      >
        {children}
      </section>
      <LandingImage />
    </div>
  );
}

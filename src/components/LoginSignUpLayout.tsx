"use client";
import { ReactNode, useState } from "react";
import LandingImage from "./LandingImage";
import Loading from "./Loading";

export default function LoginSignUpLayout({
  children,
}: {
  children: (setLoading: (value: boolean) => void) => ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loading />}
      <div className="grid grid-cols-2 h-screen p-5">
        <section
          id="login-section"
          className="flex justify-center items-start flex-col"
        >
          {children(setLoading)}
        </section>
        <LandingImage />
      </div>
    </>
  );
}

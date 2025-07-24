import type { Metadata } from "next";
import "../globals.css";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign up Page",
  description: "Sign up page for password manager app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

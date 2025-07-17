import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sign up Page",
  description: "Sign up page for password manager app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return { children };
}

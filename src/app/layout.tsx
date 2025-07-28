import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { AuthProvider } from "../components/SessionProvider";

export const metadata: Metadata = {
  title: "Password Manager",
  description: "Create and manage your passwords securely",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}

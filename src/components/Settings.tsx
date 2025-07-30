"use client";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  return (
    <>
      <h2>Settings</h2>
      <button className="red-btn" onClick={() => signOut({ callbackUrl: "/" })}>
        Log out
      </button>
    </>
  );
}

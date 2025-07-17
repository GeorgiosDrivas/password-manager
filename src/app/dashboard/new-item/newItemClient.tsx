"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewItemClient({ userId }: { userId: string }) {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleNewItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/new-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, username, password, url, userId }),
    });

    if (res.ok) {
      router.push("/dashboard/items");
    } else {
      const error = await res.text();
      alert("New item addition failed: " + error);
      console.log(error);
    }
  };

  return (
    <>
      <h2>Add a new Item</h2>
      <form onSubmit={handleNewItem} id="new-item-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="cursor-pointer">
          Add
        </button>
      </form>
    </>
  );
}

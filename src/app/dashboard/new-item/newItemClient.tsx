"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewItemClient({ userId }: { userId: string }) {
  const [newItemState, setNewItemState] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
  });
  const router = useRouter();

  const handleNewItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/new-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newItemState.title,
        username: newItemState.username,
        password: newItemState.password,
        url: newItemState.url,
        userId,
      }),
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
          value={newItemState.title}
          onChange={(e) =>
            setNewItemState({ ...newItemState, title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={newItemState.username}
          onChange={(e) =>
            setNewItemState({ ...newItemState, username: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newItemState.password}
          onChange={(e) =>
            setNewItemState({ ...newItemState, password: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Url"
          value={newItemState.url}
          onChange={(e) =>
            setNewItemState({ ...newItemState, url: e.target.value })
          }
          required
        />
        <button type="submit" className="cursor-pointer">
          Add
        </button>
      </form>
    </>
  );
}

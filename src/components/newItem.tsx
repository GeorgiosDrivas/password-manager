"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { itemSchema } from "@/src/schemas/ItemSchema";

export default function NewItem({ userId }: { userId: string }) {
  const [newItemState, setNewItemState] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
  });
  const router = useRouter();

  const handleNewItem = async (e: any) => {
    e.preventDefault();
    const schemaResult = itemSchema.safeParse(newItemState);

    if (!schemaResult.success) {
      console.error(`Invalid item data: ${schemaResult.error.message}`);
      return;
    }

    try {
      const res = await fetch("/api/items/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newItemState,
          userId,
        }),
      });
      router.push("/dashboard/items");
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  return (
    <>
      <h2 className="rubik-head-light">Add a new password</h2>
      <form onSubmit={handleNewItem} id="new-item-form" className="mt-4">
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
        <button type="submit" className="cursor-pointer fira-sans-medium">
          Add
        </button>
      </form>
    </>
  );
}

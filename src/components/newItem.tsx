"use client";

import { useRouter } from "next/navigation";
import { itemSchema } from "@/src/schemas/ItemSchema";
import { useForm } from "react-hook-form";
import { Password } from "../types/password";

export default function NewItem({ userId }: { userId: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Password>();

  const handleNewItem = async (data: Password) => {
    const schemaResult = itemSchema.safeParse(data);

    if (!schemaResult.success) {
      console.error(`Invalid item data: ${schemaResult.error.message}`);
      return;
    }

    try {
      const res = await fetch("/api/items/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
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
      <form
        onSubmit={handleSubmit(handleNewItem)}
        id="new-item-form"
        className="mt-4"
      >
        <input {...register("title", { required: true })} />
        <input {...register("username", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <input {...register("url", { required: true })} />
        <button
          type="submit"
          className="cursor-pointer fira-sans-medium btn-hover"
        >
          Add
        </button>
      </form>
    </>
  );
}

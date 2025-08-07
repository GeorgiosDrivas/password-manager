"use client";

import { useRouter } from "next/navigation";
import { noIdItemSchema, noIdItemSchemaType } from "@/src/schemas/ItemSchema";
import { useForm } from "react-hook-form";

export default function NewItem({ userId }: { userId: string }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<noIdItemSchemaType>();

  const handleNewItem = async (data: noIdItemSchemaType) => {
    const schemaResult = noIdItemSchema.safeParse(data);

    if (!schemaResult.success) {
      console.error(`Invalid item data: ${schemaResult.error.message}`);
      return;
    }

    try {
      await fetch("/api/items/new", {
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
        <div>
          <input
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div>
          <input
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <input placeholder="Url" {...register("url", { required: true })} />
          {errors.url && <p>{errors.url.message}</p>}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="cursor-pointer fira-sans-medium btn-hover"
        >
          {isSubmitting ? "Loading" : "Add"}
        </button>
      </form>
    </>
  );
}

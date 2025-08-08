"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ItemSchemaType, noIdItemSchema } from "../schemas/ItemSchema";
import HideSvg from "./svgs/hideSvg";
import ShowSvg from "./svgs/showSvg";
import { useForm } from "react-hook-form";

export default function EditSelectedItem({ item }: { item: ItemSchemaType }) {
  const router = useRouter();

  const [openAccordion, setOpenAccordion] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemSchemaType>({
    defaultValues: {
      title: item.title,
      username: item.username,
      password: item.password,
      url: item.url,
    },
  });

  const handleEditItem = async (data: ItemSchemaType) => {
    const schemaResult = noIdItemSchema.safeParse(data);

    if (!schemaResult.success) {
      console.error("Validation error:", schemaResult.error.format());
      setOpenAccordion(false);
      return;
    }

    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          itemId: item.id,
        }),
      });

      if (!response.ok) {
        console.error("Server error:", await response.text());
        return;
      }

      router.push("/dashboard/items");
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setOpenAccordion(false);
    }
  };

  return (
    <>
      <section id="edit-selected-item">
        <h2
          className="cursor-pointer rubik-head-medium"
          onClick={() => setOpenAccordion(!openAccordion)}
        >
          Edit
        </h2>
        <div hidden={!openAccordion} className="mt-4">
          <form id="selected-item-form" onSubmit={handleSubmit(handleEditItem)}>
            <div>
              <input {...register("title")} className="w-full" />
              {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div>
              <input {...register("username")} className="w-full" />
              {errors.username && <p>{errors.username.message}</p>}
            </div>
            <div className="relative">
              <input
                {...register("password")}
                className="w-full"
                type={!showPassword ? "password" : "text"}
              />
              {errors.password && <p>{errors.password.message}</p>}
              <div
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HideSvg /> : <ShowSvg />}
              </div>
            </div>
            <div>
              <input {...register("url")} className="w-full" />
              {errors.url && <p>{errors.url.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer btn-hover fira-sans-medium"
            >
              {isSubmitting ? "Loading..." : "Edit item"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

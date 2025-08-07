"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ItemSchemaType, noIdItemSchema } from "../schemas/ItemSchema";
import HideSvg from "./svgs/hideSvg";
import ShowSvg from "./svgs/showSvg";
import { useForm } from "react-hook-form";

export default function EditSelectedItem({ item }: { item: ItemSchemaType }) {
  const editedData = {
    title: item.title,
    username: item.username,
    password: item.password,
    url: item.url,
  };

  const [openAccordion, setOpenAccordion] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemSchemaType>();

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
              <input
                {...register("title")}
                defaultValue={editedData.title}
                className="w-full"
              />
            </div>
            <div>
              <input
                {...register("username")}
                defaultValue={editedData.username}
                className="w-full"
              />
            </div>
            <div className="relative">
              <input
                defaultValue={editedData.password}
                {...register("password")}
                className="w-full"
                type={!showPassword ? "password" : "text"}
              />
              <div
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <HideSvg /> : <ShowSvg />}
              </div>
            </div>
            <div>
              <input
                {...register("url")}
                className="w-full"
                defaultValue={editedData.url}
              />
            </div>
            <button className="cursor-pointer btn-hover fira-sans-medium">
              Edit item
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

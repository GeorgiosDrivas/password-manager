"use client";

import CloseSvg from "@/src/components/CloseSvg";
import EditSelectedItem from "@/src/components/EditSelectedItem";
import SelectedItemDetails from "@/src/components/SelectedItemDetails";
import { getUrlFavicon } from "@/src/utils/getFaviconUrl";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SelectedItem({ item, setSelectedItem }: any) {
  const router = useRouter();

  const handleDelete = async () => {
    const response = await fetch("/api/delete-item", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: item.id }),
    });

    if (response.ok) {
      setSelectedItem(null);
      router.push("/dashboard/items");
    } else {
      const errorData = await response.json();
      console.error("Error deleting item:", errorData);
    }
  };

  return (
    <>
      <section id="selected-item" className="h-full absolute overflow-hidden">
        <button
          className="close-btn cursor-pointer bg-transparent absolute text-3xl border-none"
          onClick={() => setSelectedItem(null)}
        >
          <CloseSvg />
        </button>
        <div className="flex items-center justify-start mt-5">
          <Image
            src={getUrlFavicon(item.url)}
            alt="Website favicon"
            width={80}
            height={80}
          />
          <div className="flex flex-col ms-5">
            <h1 className="text-3xl">{item.title}</h1>
            <a href={item.url} title={item.title} target="_blank">
              {item.url}
            </a>
          </div>
        </div>
        <SelectedItemDetails item={item} />
        <EditSelectedItem item={item} />
        <button id="delete-item-btn" onClick={handleDelete}>
          Delete item
        </button>
      </section>
    </>
  );
}

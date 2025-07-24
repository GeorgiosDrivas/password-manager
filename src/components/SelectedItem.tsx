"use client";

import CloseSvg from "@/src/components/CloseSvg";
import EditSelectedItem from "@/src/components/EditSelectedItem";
import SelectedItemDetails from "@/src/components/SelectedItemDetails";
import { getUrlFavicon } from "@/src/utils/getFaviconUrl";
import Image from "next/image";

export default function SelectedItem({ item, setSelectedItem }: any) {
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
        <button id="delete-item-btn">Delete item</button>
      </section>
    </>
  );
}

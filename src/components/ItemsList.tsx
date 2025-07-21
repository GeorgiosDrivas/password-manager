"use client";

import Image from "next/image";
import { useState } from "react";
import SelectedItem from "./SelectedItem";
import { getUrlFavicon } from "@/src/utils/getFaviconUrl";

export default function ItemsList({ data }: any) {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <>
      <h2>Items</h2>
      <div id="items-list" className="mt-8">
        {data &&
          data.map((item: any) => (
            <div
              key={item.id}
              className="flex justify-between items-center group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="flex items-center">
                <Image
                  src={getUrlFavicon(item.url)}
                  alt="Website favicon"
                  width={50}
                  height={50}
                />
                <div>
                  <p>{item.title}</p>
                  <p>{item.url}</p>
                </div>
              </div>
              <div className="item-details-btn hidden group-hover:block">
                <button className="cursor-pointer flex justify-center items-center">
                  ...
                </button>
              </div>
            </div>
          ))}
      </div>
      {selectedItem && (
        <SelectedItem item={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </>
  );
}

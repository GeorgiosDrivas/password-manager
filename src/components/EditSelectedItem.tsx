import { useRouter } from "next/navigation";
import { useState } from "react";
import { itemSchema } from "../schemas/ItemSchema";

export default function EditSelectedItem({ item }: any) {
  const [openAccordion, setOpenAccordion] = useState(false);
  const [editedData, setEditedData] = useState({
    title: item.title,
    username: item.username,
    password: item.password,
    url: item.url,
  });
  const router = useRouter();

  const handleSubmit = async () => {
    const schemaResult = itemSchema.safeParse(editedData);

    if (!schemaResult.success) {
      console.error("Validation error:", schemaResult.error.format());
      setOpenAccordion(false);
      return;
    }

    try {
      const response = await fetch("/api/edit-item", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...schemaResult.data,
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
          className="cursor-pointer"
          onClick={() => setOpenAccordion(!openAccordion)}
        >
          Edit
        </h2>
        <div hidden={!openAccordion} className="mt-4">
          <form id="selected-item-form" onSubmit={handleSubmit}>
            <div>
              <input
                className="w-full"
                type="text"
                id="title"
                name="title"
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
                }
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                name="username"
                value={editedData.username}
                onChange={(e) =>
                  setEditedData({ ...editedData, username: e.target.value })
                }
              />
            </div>
            <div>
              <input
                className="w-full"
                type="password"
                name="password"
                value={editedData.password}
                onChange={(e) =>
                  setEditedData({ ...editedData, password: e.target.value })
                }
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                name="url"
                value={editedData.url}
                onChange={(e) =>
                  setEditedData({ ...editedData, url: e.target.value })
                }
              />
            </div>
            <button className="cursor-pointer btn-hover">Edit item</button>
          </form>
        </div>
      </section>
    </>
  );
}

import { useRouter } from "next/navigation";
import { useState } from "react";

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
    try {
      const response = await fetch("/api/edit-item", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editedData.title,
          username: editedData.username,
          password: editedData.password,
          url: editedData.url,
          itemId: item.id,
        }),
      });

      if (response.ok) {
        router.push("/dashboard/items");
      }
    } catch (e) {
      console.log(e);
    }
    setOpenAccordion(false);
  };

  return (
    <>
      <section>
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
            <button className="cursor-pointer btn-hover">Edit</button>
          </form>
        </div>
      </section>
    </>
  );
}

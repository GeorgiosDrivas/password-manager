import { useState } from "react";

export default function EditSelectedItem({ item }: any) {
  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <>
      <section onClick={() => setOpenAccordion(!openAccordion)}>
        <h2 className="mb-4">Edit</h2>
        <div hidden={!openAccordion}>
          <form id="selected-item-form">
            <div>
              <input
                className="w-full"
                type="text"
                id="title"
                name="title"
                value={item.title}
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                id="title"
                name="title"
                value={item.username}
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                id="title"
                name="title"
                value={item.password}
              />
            </div>
            <div>
              <input
                className="w-full"
                type="text"
                id="title"
                name="title"
                value={item.url}
              />
            </div>
            <button className="cursor-pointer btn-hover">Edit</button>
          </form>
        </div>
      </section>
    </>
  );
}

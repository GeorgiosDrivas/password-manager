import { useState } from "react";

export default function SelectedItemDetails({ item }: any) {
  const [openAccordion, setOpenAccordion] = useState(false);

  return (
    <>
      <section
        className="mt-5 cursor-pointer"
        onClick={() => setOpenAccordion(!openAccordion)}
      >
        <h2 className="mb-4">Details</h2>
        <div hidden={!openAccordion}>
          <ul>
            <li>{item.username}</li>
            <li>{item.password}</li>
          </ul>
        </div>
      </section>
    </>
  );
}

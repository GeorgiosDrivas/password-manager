"use client";

import { useAppContext } from "../context/appContent";

export default function Search() {
  const { setSearchQuery } = useAppContext();

  return (
    <div className="mb-3">
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

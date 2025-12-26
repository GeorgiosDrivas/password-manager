"use client";
import { useState } from "react";
import { noIdItemSchemaType } from "../schemas/ItemSchema";
import { Eye, EyeOff } from "lucide-react";

export default function SelectedItemDetails({
  item,
}: {
  item: noIdItemSchemaType;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <section className="my-5">
        <div>
          <ul>
            <li className="fira-sans-medium">
              Username:{" "}
              <span className="rubik-head-medium">{item.username}</span>
            </li>
            <li className="fira-sans-medium flex items-center gap-2">
              Password:{" "}
              <span className="rubik-head-medium">
                {showPassword
                  ? item.password
                  : "•".repeat(item.password.length)}
              </span>
              <div onClick={togglePassword} className="cursor-pointer">
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

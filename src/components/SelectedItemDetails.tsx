import { useState } from "react";
import HideSvg from "./svgs/hideSvg";
import ShowSvg from "./svgs/showSvg";

export default function SelectedItemDetails({ item }: any) {
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
              <div onClick={togglePassword}>
                {showPassword ? <HideSvg /> : <ShowSvg />}
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

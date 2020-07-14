import { useContext } from "react";
import ThemeContext from "@/css/theme";
import classNames from "classnames";

export default function PageTitle({ children }) {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <h1
      className={classNames(
        "text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14",
        isDarkMode ? "text-white" : "text-gray-900"
      )}
    >
      {children}
    </h1>
  );
}

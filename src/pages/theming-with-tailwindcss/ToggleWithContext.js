import React, { useContext } from "react";
import ThemeContext from "@/css/theme";
import moon from "@/components/header/moon.png";
import sun from "@/components/header/sun.png";
import Toggle from "@/components/header/Toggle";

export default function ToggleWithContext() {
  const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);
  return (
    <Toggle
      icons={{
        checked: (
          <img
            src={moon}
            width="16"
            height="16"
            role="presentation"
            style={{ pointerEvents: "none", margin: "0px" }}
          />
        ),
        unchecked: (
          <img
            src={sun}
            width="16"
            height="16"
            role="presentation"
            style={{ pointerEvents: "none", margin: "0px" }}
          />
        ),
      }}
      checked={isDarkMode}
      onChange={() => toggleDarkMode()}
    />
  );
}

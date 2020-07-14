import React, { useState, useEffect, useContext } from "react";

const DARK_MODE_CLASS_NAME = "dark";

const removeDarkMode = () => {
  document.documentElement.classList.remove(DARK_MODE_CLASS_NAME);
};
const addDarkMode = () => {
  document.documentElement.classList.add(DARK_MODE_CLASS_NAME);
};

// Always returns false on server side, (no way to get local storage or media query)
const prefersDarkMode = () =>
  (typeof window !== "undefined" && localStorage.getItem("isDarkMode")) ===
    "true" ||
  ((typeof window !== "undefined" && localStorage.getItem("isDarkMode")) ===
    null &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // We need to do this client side and not in the state init above.
  // This is because when pre-rendering the page, prefersDarkMode will always be false
  // Since the page that is pre-rendered has prefersDarkMode false
  // the light theme styles will be pre-rendered and given to the client.
  // On the client, this hook will run but this time prefersDarkMode will potentially
  // return true. Thus the final page could contain both dark and light theme styles.
  // A easy fix is to always prerender the page with isDarkMode false (pre-renders
  // light-theme styles) and do the check after the first render of the component

  useEffect(() => {
    setIsDarkMode(prefersDarkMode());
  }, []);

  // Save to local storage the user preference
  useEffect(
    () =>
      typeof window !== "undefined" &&
      localStorage.setItem("isDarkMode", isDarkMode),
    [isDarkMode]
  );
  useEffect(() => {
    if (isDarkMode) {
      addDarkMode();
    } else {
      removeDarkMode();
    }
  }, [isDarkMode]);

  return {
    toggleDarkMode: () => setIsDarkMode((isDarkMode) => !isDarkMode),
    isDarkMode,
  };
};

const ThemeContext = React.createContext();
export const ThemeProvider = ({ children }) => {
  const { toggleDarkMode, isDarkMode } = useDarkMode();
  return (
    <ThemeContext.Provider
      value={{
        toggleDarkMode,
        isDarkMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export default ThemeContext;

import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeDebug: React.FC = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-500 text-white rounded-lg">
      <div>Current theme: {theme}</div>
      <div>isDark: {isDark.toString()}</div>
      <button
        onClick={toggleTheme}
        className="mt-2 px-3 py-1 bg-white text-black rounded"
      >
        Toggle Theme
      </button>
    </div>
  );
};

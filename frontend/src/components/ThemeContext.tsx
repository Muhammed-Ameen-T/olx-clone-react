import React, { createContext, useState, ReactNode } from "react";

// Define the context value type
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void; // Simplified type for setTheme
}

// Create the context with the appropriate type
const ThemeContext = createContext<ThemeContextType | null>(null); // Use `null` instead of `undefined`

// Props type for the provider
interface ThemeProviderProps {
  children: ReactNode; // Only ReactNode is required
}

// ThemeProvider component
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };

import React, { createContext, useState, useMemo } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";


export const ThemeContext = createContext({
  toggleTheme: () => {},
});


const baseThemeOptions = {
  typography: {
    fontFamily: "Public Sans, sans-serif", 
    h4: {
      fontWeight: 700, 
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, 
  },
};

const lightThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", 
      light: "#42a5f5",
      dark: "#1565c0",
    },
    background: {
      default: "#f4f6f8", 
      paper: "#ffffff",
    },
  },
};

const darkThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#42a5f5", 
      light: "#64b5f6",
      dark: "#1976d2",
    },
    background: {
      default: "#121212", 
      paper: "#1E1E1E", 
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const themeMethods = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const currentThemeOptions =
      mode === "light" ? lightThemeOptions : darkThemeOptions;
    return createTheme(deepmerge(baseThemeOptions, currentThemeOptions));
  }, [mode]);

  return (
    <ThemeContext.Provider value={themeMethods}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

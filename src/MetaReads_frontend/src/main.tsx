import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CollapsedProvider } from "./lib/collapsed_provider";
import { ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider2 } from "./lib/theme-provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./lib/user_provider";

// Create a dark theme using MUI's createTheme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Default background color
      paper: "#14181E", // Background for Paper components
    },
    text: {
      primary: "#ffffff", // White text for primary content
      secondary: "#bbbbbb", // Secondary color
    },
  },
});

// Add Tailwind CSS scrollbar styles globally
document.body.classList.add("scrollbar-thin");

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <ThemeProvider2 defaultTheme="dark" storageKey="vite-ui-theme">
          <UserProvider>
            <CollapsedProvider>
              <App />
              <ToastContainer stacked />
            </CollapsedProvider>
          </UserProvider>
        </ThemeProvider2>
      </ThemeProvider>
    </React.StrictMode>,
  );
}

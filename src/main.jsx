import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DarkModeContextProvider } from "./utils/darkModeContext";
import { UserContextProvider } from "./utils/userContext.jsx";

import App from "./App";
import "./assets/CSS/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

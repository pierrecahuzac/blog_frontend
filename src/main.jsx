import React from "react";
import ReactDOM from "react-dom/client";

import { UserContextProvider } from "./utils/userContext.jsx";
import { GlobalContextProvider } from "./utils/globalContext";

import App from "./App";
import "./assets/CSS/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  /*   <React.StrictMode> */
  <UserContextProvider>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </UserContextProvider>
  /* </React.StrictMode> */
);

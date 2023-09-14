import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
const container = document.getElementById("root");
const root = createRoot(container!);
import UserProvider from "./context/AuthContext";
root.render(
  <React.StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
  </React.StrictMode>
);
defineCustomElements(window);

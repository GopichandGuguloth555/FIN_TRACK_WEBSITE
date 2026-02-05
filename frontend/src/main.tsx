import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App";

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App onReady={() => {
        const loader = document.getElementById("app-loader");
        if (loader) loader.classList.add("hidden");
      }} />
    </GoogleOAuthProvider>
  </StrictMode>
);

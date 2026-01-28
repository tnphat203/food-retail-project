import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import AuthInit from "./components/auth/AuthInit";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthInit>
        <App />
      </AuthInit>
    </BrowserRouter>
  </StrictMode>,
);

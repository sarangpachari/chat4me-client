import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DataContextShare from "./contexts/DataContextShare.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataContextShare>
      <App />
    </DataContextShare>
  </StrictMode>
);

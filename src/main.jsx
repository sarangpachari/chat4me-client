import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DataContextShare from "./contexts/DataContextShare.jsx";
import { ChatProvider } from "./contexts/ChatProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataContextShare>
      <ChatProvider>
        <App />
      </ChatProvider>
    </DataContextShare>
  </StrictMode>
);

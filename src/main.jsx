import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import DataContextShare from "./contexts/DataContextShare.jsx";
import { ChatProvider } from "./contexts/ChatProvider.jsx";
import ResponseContextShare from "./contexts/ResponseContextShare.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataContextShare>
      <ChatProvider>
        <ResponseContextShare>
          <App />
        </ResponseContextShare>
      </ChatProvider>
    </DataContextShare>
  </StrictMode>
);

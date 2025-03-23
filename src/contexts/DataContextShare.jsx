import React, { createContext, useState } from "react";

export const chatPreviewDataContext = createContext();
export const loggedUserDataContext = createContext();

const DataContextShare = ({ children }) => {
  const [allChatPreviewData, setAllChatPreviewData] = useState([]);
  const [loggedUserData, setLoggedUserData] = useState(null);

  return (
    <>
      {/* LOGGED USER DATA */}
      <loggedUserDataContext.Provider
        value={{ loggedUserData, setLoggedUserData }}
      >
        {/* CHAT PREVIEW DATA SHARING */}
        <chatPreviewDataContext.Provider
          value={{ allChatPreviewData, setAllChatPreviewData }}
        >
          {children}
        </chatPreviewDataContext.Provider>
      </loggedUserDataContext.Provider>
    </>
  );
};

export default DataContextShare;

import React, { createContext, useState } from "react";
export const deleteSingleMsgResponseContext = createContext();

const ResponseContextShare = ({ children }) => {
    const [singleDeleteMsgResponse, setSingleDeleteMsgResponse] = useState("");
  return (
    <>
      {/* MESSAGE DELETE RESPONSE */}
      <deleteSingleMsgResponseContext.Provider value={{singleDeleteMsgResponse, setSingleDeleteMsgResponse}}>
        {children}
      </deleteSingleMsgResponseContext.Provider>
    </>
  );
};

export default ResponseContextShare;

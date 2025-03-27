import React, { createContext, useState } from "react";
export const deleteSingleMsgResponseContext = createContext();
export const changeProfilePictureResponseContext = createContext()

const ResponseContextShare = ({ children }) => {
    const [singleDeleteMsgResponse, setSingleDeleteMsgResponse] = useState("");
    const [changeProfilePictureResponse, setChangeProfilePictureResponse] = useState("");
  return (
    <>
      {/* MESSAGE DELETE RESPONSE */}
      <deleteSingleMsgResponseContext.Provider value={{singleDeleteMsgResponse, setSingleDeleteMsgResponse}}>
        <changeProfilePictureResponseContext.Provider value={{changeProfilePictureResponse, setChangeProfilePictureResponse}}>
        {children}
        </changeProfilePictureResponseContext.Provider>
      </deleteSingleMsgResponseContext.Provider>
    </>
  );
};

export default ResponseContextShare;

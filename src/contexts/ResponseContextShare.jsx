import React, { createContext, useState } from "react";
export const deleteSingleMsgResponseContext = createContext();
export const changeProfilePictureResponseContext = createContext()
export const groupCreatedResponseContext = createContext()
export const permanentGroupDeleteResponseContext = createContext()

const ResponseContextShare = ({ children }) => {
    const [singleDeleteMsgResponse, setSingleDeleteMsgResponse] = useState("");
    const [changeProfilePictureResponse, setChangeProfilePictureResponse] = useState("");
    const [groupCreatedResponse,setGroupCreatedResponse] = useState("")
    const [permanentGroupDeleteResponse,setPermanentGroupDeleteResponse] = useState("")
  return (
    <>
      {/* MESSAGE DELETE RESPONSE */}
      <deleteSingleMsgResponseContext.Provider value={{singleDeleteMsgResponse, setSingleDeleteMsgResponse}}>
        <changeProfilePictureResponseContext.Provider value={{changeProfilePictureResponse, setChangeProfilePictureResponse}}>
          <groupCreatedResponseContext.Provider value={{groupCreatedResponse,setGroupCreatedResponse}}>
            <permanentGroupDeleteResponseContext.Provider value={{permanentGroupDeleteResponse,setPermanentGroupDeleteResponse}}>
        {children}
            </permanentGroupDeleteResponseContext.Provider>
          </groupCreatedResponseContext.Provider>
        </changeProfilePictureResponseContext.Provider>
      </deleteSingleMsgResponseContext.Provider>
    </>
  );
};

export default ResponseContextShare;

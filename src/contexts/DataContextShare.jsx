import React, { createContext, useState } from 'react'

export const chatPreviewDataContext = createContext()

const DataContextShare = ({children}) => {

    const [chatPreviewData,setChatPreviewData] = useState([])

  return (
    <>
        <chatPreviewDataContext.Provider value={{chatPreviewData,setChatPreviewData}}>
            {children}
        </chatPreviewDataContext.Provider>
    </>
  )
}

export default DataContextShare
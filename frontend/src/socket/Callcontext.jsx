import { createContext,useContext, useState } from "react";

const CallContext = createContext();

export const CallProvider = ({children}) =>{
    const [incomingCall , setIncomingCall] = useState(null)
    const [onCall , setOnCall] = useState(false)

    return(
        <CallContext.Provider value= {{incomingCall,setIncomingCall,onCall,setOnCall}}>{children}</CallContext.Provider>
    )
}

export const useCall = () => useContext(CallContext)
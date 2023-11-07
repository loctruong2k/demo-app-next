"use client"
import { createContext } from "react";
import { ContextType, MessageFormContextType } from "./type";

export const initDataMessageContext: ContextType = {
    data: {
        id: ""
    },
    handleChange: () => { }
}
export const MessageContext = createContext<ContextType>(initDataMessageContext)
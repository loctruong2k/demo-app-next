"use client"
import { useContext } from "react"
import { MessageContext } from "./context"

export const useFormMessage = () => {
    const state = useContext(MessageContext)
    return state
}
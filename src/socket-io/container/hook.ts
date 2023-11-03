import { useContext } from "react"
import MyContextSocket from "./context"

export const useSocket = () => {
    const socket = useContext(MyContextSocket)
    return socket
}
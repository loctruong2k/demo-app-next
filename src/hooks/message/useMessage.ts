"use client"

import { useEffect } from "react"
import { useSocket } from "../../socket-io/container/hook"
import { useQueryClient } from "@tanstack/react-query"
import { listMessage } from "./listMessage"
import { likeMessage } from "./likeMessage"
import { sendMessage } from "./sendMessage"

export const useMessageSocket = () => {
    const queryClient = useQueryClient()
    const socket = useSocket()
    useEffect(() => {
        if (!socket) return
        listMessage(socket, queryClient)
        likeMessage(socket, queryClient)
        sendMessage(socket, queryClient)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
}
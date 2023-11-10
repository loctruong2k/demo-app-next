"use client"

import { useEffect } from "react"
import { useSocket } from "../../socket-io/container/hook"
import { useQueryClient } from "@tanstack/react-query"
import { listMessage } from "./listMessage"
import { likeMessage } from "./likeMessage"
import { sendMessage } from "./sendMessage"
import { emitKeys } from "@/src/constants/emitKeys"
import { queryKeys } from "@/src/constants/query-key"

export const useMessageSocket = () => {
    const queryClient = useQueryClient()
    const socket = useSocket()
    useEffect(() => {
        if (!socket) return
        socket.emit(emitKeys.group.list)
        socket.on(emitKeys.group.list, (data) => {
            if (!data.success) return
            queryClient.setQueryData([queryKeys.listGroup], data.data)
        })
        listMessage(socket, queryClient)
        likeMessage(socket, queryClient)
        sendMessage(socket, queryClient)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
}
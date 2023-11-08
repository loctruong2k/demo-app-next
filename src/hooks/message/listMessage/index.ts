"use client"
import { emitKeys } from "@/src/constants/emitKeys";
import { queryKeys } from "@/src/constants/query-key";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { scrollToBottom } from "../scrollToBottom";

const listMessage = (socket: Socket, queryClient: QueryClient) => {
    socket.on(emitKeys.message.listMessage, (data) => {
        queryClient.setQueryData([queryKeys.group_message.listMessage, data.id], data.data)
        setTimeout(() => {
            scrollToBottom()
        }, 250)
    })
}

export { listMessage }
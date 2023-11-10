"use client"
import { emitKeys } from "@/src/constants/emitKeys";
import { queryKeys } from "@/src/constants/query-key";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import { scrollToBottom } from "../scrollToBottom";
import { ListGroupType } from "@/src/types/groupType";

const listMessage = (socket: Socket, queryClient: QueryClient) => {
    socket.on(emitKeys.message.listMessage, (data) => {
        if (data.page === 1) {
            queryClient.setQueryData([queryKeys.group_message.listMessage, data.id], data.data)
            queryClient.setQueryData([queryKeys.group_message.listMessage, data.id, "total"], data.total)
            setTimeout(() => {
                scrollToBottom()
            }, 250)
            queryClient.setQueryData([queryKeys.group_message.listMessage, data.id, "loading"], false)
            return
        }
        const dataList: ListGroupType[] = queryClient.getQueryData([queryKeys.group_message.listMessage, data.id]) as ListGroupType[]
        queryClient.setQueryData([queryKeys.group_message.listMessage, data.id], [...dataList, ...data.data])
        queryClient.setQueryData([queryKeys.group_message.listMessage, data.id, "loading"], false)
    })
}

export { listMessage }
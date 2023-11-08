"use client"

import { ItemMessageData, LikeMessageType } from "@/src/components/message-account/list-message/type"
import { emitKeys } from "@/src/constants/emitKeys"
import { queryKeys } from "@/src/constants/query-key"
import { QueryClient } from "@tanstack/react-query"
import { Socket } from "socket.io-client"

export const likeMessage = (socket: Socket, queryClient: QueryClient) => {
    socket.on(emitKeys.message.likeMessage, (data) => {

        if (!data.success) return
        const listMessage: ItemMessageData[] = queryClient.getQueryData([queryKeys.group_message.listMessage, data.groupId]) as ItemMessageData[]
        const newData = listMessage.map((item) => {
            let likes: LikeMessageType[] = item.likeMessageList || []
            if (item._id === data.data.chatId) {
                likes = [...likes, data.data]
            }
            return {
                ...item,
                likeMessageList: likes
            }
        })
        queryClient.setQueryData([queryKeys.group_message.listMessage, data.groupId], newData)
    })
}
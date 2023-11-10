"use client"
import { ItemMessageData } from "@/src/components/message-account/list-message/type";
import { emitKeys } from "@/src/constants/emitKeys";
import { queryKeys } from "@/src/constants/query-key";
import { ListGroupType } from "@/src/types/groupType";
import { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";

const sendMessage = (socket: Socket, queryClient: QueryClient) => {
    socket.on(emitKeys.message.send, (dataMessage) => {
        const messageData: ItemMessageData = {
            _id: dataMessage.data._id,
            content: dataMessage.data.content,
            accountId: dataMessage.data.accountId,
            chatsLike: [],
            created_at: dataMessage.data.created_at,
            files: dataMessage.files,
            groupId: dataMessage.data.groupId,
            info: dataMessage.profile,
            parentId: dataMessage.data.parentId,
            status: dataMessage.data.status,
            updated_at: dataMessage.data.updated_at,
            parentMessage: dataMessage.parentMessage,
            parentMessageInfo: dataMessage.parentMessageInfo
        }
        const arrayMessage: ItemMessageData[] = queryClient.getQueryData([queryKeys.group_message.listMessage, messageData.groupId]) as ItemMessageData[]
        if (Array.isArray(arrayMessage) && arrayMessage.length) {
            const newData = arrayMessage.map(i => {
                if (i._id === "new") {
                    return messageData
                }
                return i
            })
            queryClient.setQueryData([queryKeys.group_message.listMessage, messageData.groupId], newData)
        }
        const listGroup: ListGroupType[] = queryClient.getQueryData([queryKeys.listGroup]) as ListGroupType[]
        if (!Array.isArray(arrayMessage) || !arrayMessage.length) return
        const newMessage = listGroup.map((item) => {
            if (item.groups._id === messageData.groupId) {
                return {
                    ...item,
                    chatMessages: {
                        accountId: messageData.accountId,
                        content: messageData.content,
                        files: messageData.files,
                        groupId: messageData.groupId,
                        parentId: messageData.parentId,
                        _id: messageData._id
                    },
                    accountInfo: dataMessage.profile
                }
            }
            return item
        })
        queryClient.setQueryData([queryKeys.listGroup], newMessage)
    })
}

export { sendMessage }
"use client"

import { emitKeys } from "@/src/constants/emitKeys";
import { useSocket } from "@/src/socket-io/container/hook"
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { scrollToBottom } from "../message/scrollToBottom";
import { queryKeys } from "@/src/constants/query-key";
import { ListGroupType } from "@/src/types/groupType";
import { ItemMessageData } from "@/src/components/message-account/list-message/type";

export const useNotifications = () => {
    const socket = useSocket();
    const queryClient = useQueryClient()
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        if (!socket) return
        socket.on(emitKeys.notification.index, (dataMessage) => {
            if (dataMessage.type === emitKeys.message.send) {
                if (timer.current) {
                    clearTimeout(timer.current)
                }
                timer.current = setTimeout(() => {
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
                    const listMessageId: ItemMessageData[] = queryClient.getQueryData([queryKeys.group_message.listMessage, messageData.groupId]) as ItemMessageData[]
                    const newData = [messageData, ...listMessageId]
                    queryClient.setQueryData([queryKeys.group_message.listMessage, messageData.groupId], newData)
                    const listGroup: ListGroupType[] = queryClient.getQueryData([queryKeys.listGroup]) as ListGroupType[]
                    const newMessage = listGroup?.map((item) => {
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
                    setTimeout(() => {
                        scrollToBottom()
                    }, 500);
                }, 250);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
}

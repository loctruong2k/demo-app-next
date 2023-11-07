"use client"
import { InfoData } from '@/src/api/info/type'
import { emitKeys } from '@/src/constants/emitKeys'
import { queryKeys } from '@/src/constants/query-key'
import { useSocket } from '@/src/socket-io/container/hook'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import ItemMessage from '../item-message'
import { useFormMessage } from '../message-form-context/hook'
import { keyContext } from '../message-form-context/type'
import { ItemMessageData, LikeMessageType, ResponseListMessage } from './type'
import MessageEmpty from '../empty'
type Props = {}

function ListMessage({ }: Props) {
    const socket = useSocket()
    const footerRef = useRef<HTMLDivElement>(null)
    const timerMessage = useRef<NodeJS.Timeout | undefined>(undefined);
    const timerLike = useRef<NodeJS.Timeout | undefined>(undefined);
    const { data, handleChange } = useFormMessage()
    const { data: profile } = useQuery<InfoData>({
        queryKey: [queryKeys.profile]
    })
    const [listMessage, setListMessage] = useState<ResponseListMessage>({
        page: 1,
        size: 50,
        data: [],
        success: true,
        total: 0
    })

    useEffect(() => {
        if (!data.id || !socket) return
        socket.emit(emitKeys.message.listMessage, {
            id: data.id,
            page: 1,
            size: 50
        })
    }, [data.id, socket])

    useEffect(() => {
        if (!socket) return
        socket.on(emitKeys.message.send, (dataMessage) => {
            if (!listMessage) return
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
            handleChange(keyContext.SendMessage, undefined)
            setListMessage(prev => ({
                ...prev,
                data: prev.data.map(i => {
                    if (i._id === "new") {
                        return messageData
                    }
                    return i
                })
            }))
        })
        socket.on(emitKeys.message.listMessage, (data: ResponseListMessage) => {
            setListMessage(data)
            setTimeout(() => {
                scrollToBottom()
            }, 150);
        })
        socket.on(emitKeys.message.likeMessage, (data) => {
            if (!data.success) return
            if (timerLike.current) {
                clearTimeout(timerLike.current)
            }
            timerLike.current = setTimeout(() => {
                setListMessage(prev => ({
                    ...prev,
                    data: prev.data.map((item) => {
                        let likes: LikeMessageType[] = item.likeMessageList || []
                        if (item._id === data.data.chatId) {
                            likes = [...likes, data.data]
                        }
                        return {
                            ...item,
                            likeMessageList: likes
                        }
                    })
                }))
            }, 500)
        })
        socket.on(emitKeys.notification.index, (dataMessage) => {
            if (dataMessage.type === emitKeys.message.send && dataMessage.data.groupId === data.id) {
                if (timerMessage.current) {
                    clearTimeout(timerMessage.current)
                }
                timerMessage.current = setTimeout(() => {
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
                    setListMessage(prev => ({
                        ...prev,
                        data: [messageData, ...prev.data]
                    }))
                    setTimeout(() => {
                        scrollToBottom()
                    }, 500);
                }, 500);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    useEffect(() => {
        if (!data.messagePending) return
        setListMessage(prev => ({
            ...prev,
            data: [data.messagePending as ItemMessageData, ...prev.data]
        }))
        setTimeout(() => {
            scrollToBottom()
        }, 500);
    }, [data.messagePending])

    const scrollToBottom = () => {
        if (!footerRef.current) return
        footerRef.current.scrollIntoView({ behavior: "instant" })
    }

    if (!listMessage.data.length || !data.userInfo || !profile) return <div className='w-full h-full flex items-center justify-center'>
        Loading ...
    </div>

    return (
        <div className='h-full w-full overflow-auto flex flex-col-reverse pt-10'>
            <div ref={footerRef} />
            {listMessage?.data.length ?
                listMessage?.data.map((item, index) => {
                    return <ItemMessage item={item} index={index} key={index} profile={profile} />
                })
                :
                <MessageEmpty />
            }
        </div>
    )
}

export default ListMessage
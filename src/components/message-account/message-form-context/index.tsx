"use client"
import { InfoData } from '@/src/api/info/type'
import { emitKeys } from '@/src/constants/emitKeys'
import { queryKeys } from '@/src/constants/query-key'
import { useSocket } from '@/src/socket-io/container/hook'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { MessageForm } from '../type'
import { MessageContext } from './context'
import { MessageFormContextType, keyContext } from './type'

type Props = {
    children: React.ReactNode,
    id: string
}

function MessageFormContext({ children, id }: Props) {
    const router = useRouter()
    const { data: profile } = useQuery<InfoData>({
        queryKey: [queryKeys.profile]
    })
    const [state, setState] = useState<MessageFormContextType>({
        id: id
    })
    const socket = useSocket()
    // lưu lại dữ liệu nếu infoBox thay đổi
    useEffect(() => {
        if (!id || !socket) return
        setState(prev => ({
            ...prev,
            id: id
        }))
        socket?.emit(emitKeys.group.infoGroup, id)
    }, [id, socket])

    useEffect(() => {
        if (!socket) return
        // lấy thông tin account
        socket.on(emitKeys.group.infoAccount, (data) => {            
            if (!data.success) return
            setState(prev => ({
                ...prev,
                userInfo: data.data
            }))
        })
        // lây thông tin của group
        socket.on(emitKeys.group.infoGroup, (data) => {
            if (data.success) {
                const members = data.data.members
                const memberChat = members.find((item: any) => item.accountId !== profile?.accountID)
                setState(prev => ({
                    ...prev,
                    id: data.data.group._id,
                    members: members,
                    setting: data.setting
                }))                
                socket.emit(emitKeys.group.infoAccount, memberChat.accountId)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
    const handleChange = (key: keyContext, value?: any) => {
        
    }
    return (
        <MessageContext.Provider value={{ data: state, handleChange }}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageFormContext
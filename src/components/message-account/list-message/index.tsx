"use client"
import { InfoData } from '@/src/api/info/type'
import { emitKeys } from '@/src/constants/emitKeys'
import { queryKeys } from '@/src/constants/query-key'
import { useSocket } from '@/src/socket-io/container/hook'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import MessageEmpty from '../empty'
import ItemMessage from '../item-message'
import { useFormMessage } from '../message-form-context/hook'
import { ItemMessageData } from './type'


function ListMessage() {
    const { data } = useFormMessage()
    const { data: listMessageData } = useQuery<ItemMessageData[]>({
        queryKey: [queryKeys.group_message.listMessage, data.id]
    })
    const socket = useSocket()

    const { data: profile } = useQuery<InfoData>({
        queryKey: [queryKeys.profile]
    })

    useEffect(() => {
        if (!data.id || !socket) return
        socket.emit(emitKeys.message.listMessage, {
            id: data.id,
            page: 1,
            size: 50
        })
    }, [data.id, socket])

    if (!Array.isArray(listMessageData) || !listMessageData.length || !data.userInfo || !profile) return <div className='w-full h-full flex items-center justify-center'>
        Loading ...
    </div>

    return (
        <div className='h-full w-full overflow-auto flex flex-col-reverse pt-10'>
            <div id={"end-list-message"} />
            {Array.isArray(listMessageData) && listMessageData.length ?
                listMessageData.map((item, index) => {
                    return <ItemMessage item={item} index={index} key={index} profile={profile} />
                })
                :
                <MessageEmpty />
            }
        </div>
    )
}

export default ListMessage
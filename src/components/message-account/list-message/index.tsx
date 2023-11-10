"use client"
import { InfoData } from '@/src/api/info/type'
import { emitKeys } from '@/src/constants/emitKeys'
import { queryKeys } from '@/src/constants/query-key'
import { useSocket } from '@/src/socket-io/container/hook'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import MessageEmpty from '../empty'
import ItemMessage from '../item-message'
import { useFormMessage } from '../message-form-context/hook'
import { ItemMessageData } from './type'
import { useInView } from 'react-intersection-observer';

function ListMessage() {
    const { data } = useFormMessage()
    const queryClient = useQueryClient();
    const { data: listMessageData } = useQuery<ItemMessageData[]>({
        queryKey: [queryKeys.group_message.listMessage, data.id]
    })
    const { data: totalLength } = useQuery<number>({
        queryKey: [queryKeys.group_message.listMessage, data.id, "total"]
    })
    const { data: loadingMessage } = useQuery<boolean>({
        queryKey: [queryKeys.group_message.listMessage, data.id, "loading"]
    })
    const socket = useSocket()
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

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
    }, [data.id, socket,])

    useEffect(() => {
        const listDataLength = listMessageData?.length || 0
        if (!data.id || !socket || !inView || !listDataLength || !totalLength) return
        if (listDataLength >= (totalLength || 0)) return
        queryClient.setQueryData([queryKeys.group_message.listMessage, data.id, "loading"], true)
        const page = Math.floor((listDataLength / 50)) + 1
        socket.emit(emitKeys.message.listMessage, {
            id: data.id,
            page: page,
            size: 50
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView])

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
            {loadingMessage ?
                <div className="flex flex-col items-center justify-center w-full p-2">
                    <span className="text-gray-400">Đang tải ...</span>
                    <div className={`w-4 mt-1 h-4 border-t-2 mr-2 border-blue-200 border-solid rounded-full animate-spin`} />
                </div>
                :
                <div ref={ref} />
            }
        </div>
    )
}

export default ListMessage
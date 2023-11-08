"use client"
import Loading from '@/app/loading'
import HeaderBoxMessage from '@/src/components/header-message'
import ListGroup from '@/src/components/list-group'
import MessageBox from '@/src/components/message-account'
import { emitKeys } from '@/src/constants/emitKeys'
import { queryKeys } from '@/src/constants/query-key'
import { useSocket } from '@/src/socket-io/container/hook'
import { ListGroupType } from '@/src/types/groupType'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

function MessagePage() {
    const queryClient = useQueryClient()
    const [currentItem, setCurrentItem] = useState<ListGroupType>()

    const socket = useSocket()
    useEffect(() => {
        if (!socket) return
        socket.emit(emitKeys.group.list)
        socket.on(emitKeys.group.list, (data) => {
            if (!data.success) return
            queryClient.setQueryData([queryKeys.listGroup], data.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])

    return (
        <div className="h-full w-full">
            <div className='flex flex-row h-full'>
                <ListGroup currentItem={currentItem} setCurrentItem={item => setCurrentItem(item)} />
                <div className="flex-[3] h-full w-full overflow-hidden">
                    {currentItem ?
                        <div className='flex flex-col h-full'>
                            <div className="h-14 shadow-md border-b">
                                <HeaderBoxMessage onLeftClick={() => {
                                    console.log("onLeftClick");

                                    setCurrentItem(undefined)
                                }} dataItem={currentItem} />
                            </div>
                            <div className='flex-1 h-[calc(100%-3.5rem)]'>
                                <MessageBox id={currentItem?.groups._id} />
                            </div>
                        </div>
                        :
                        <div className='flex w-full h-full items-center justify-center'>
                            <p className='p-2 rounded-2xl text-gray-400'>Chọn nhóm chats để bắt đầu</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagePage
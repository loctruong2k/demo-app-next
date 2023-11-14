"use client"
import HeaderBoxMessage from '@/src/components/header-message'
import ListGroup from '@/src/components/list-group'
import MessageBox from '@/src/components/message-account'
import { queryKeys } from '@/src/constants/query-key'
import { ListGroupType } from '@/src/types/groupType'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

function MessagePage() {
    const queryClient = useQueryClient()
    const { data: ItemGroupType } = useQuery<ListGroupType>({
        queryKey: [queryKeys.group_message.currentItemGroup]
    })

    return (
        <div className="h-full w-full">
            <div className='flex flex-row h-full'>
                <ListGroup />
                <div className={`${ItemGroupType ? "block" : "hidden"} md:!block flex-[3] h-full w-full overflow-hidden`}>
                    {ItemGroupType ?
                        <div className='flex flex-col h-full'>
                            <div className="h-14 shadow-md border-b">
                                <HeaderBoxMessage
                                    onLeftClick={() => {
                                        queryClient.setQueryData([queryKeys.group_message.currentItemGroup], null)
                                    }}
                                />
                            </div>
                            <div className='flex-1 h-[calc(100%-3.5rem)]'>
                                <MessageBox id={ItemGroupType?.groups._id} />
                            </div>
                        </div>
                        :
                        <div className='flex w-full h-full items-center justify-center'>
                            <p className='p-2 rounded-2xl text-gray-400'>Chọn nhóm để bắt đầu !</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MessagePage
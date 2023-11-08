"use client"
import { DB_HOST } from '@/src/api/config'
import { InfoData } from '@/src/api/info/type'
import { queryKeys } from '@/src/constants/query-key'
import { ListGroupType } from '@/src/types/groupType'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import TimeLine from '../time-line'
import Loading from '@/app/loading'
import { useRef, useState } from 'react'

type Props = {
    currentItem?: ListGroupType
    setCurrentItem: (item: ListGroupType) => void
}

function ListGroup({ currentItem, setCurrentItem }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
    const [keyword, setKeyword] = useState<string>("")

    const { data, isLoading } = useQuery<ListGroupType[]>({
        queryKey: [queryKeys.listGroup]
    })
    const { data: profile } = useQuery<InfoData>({
        queryKey: [queryKeys.profile]
    })

    const onkeydown = () => {
        if (!inputRef.current) return
        const value = inputRef.current.value
        if (timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            setKeyword(value)
        }, 1000)
    }
    const dataFilter = Array.isArray(data) ? keyword ? data?.filter(i => i.groups.name.includes(keyword)) : data : []
    return (
        <div className='flex-[1] border-r h-full min-w-[200px] shadow'>
            <div className='border-t p-2'>
                <input ref={inputRef} onKeyDown={onkeydown} placeholder='Tìm kiếm' className="bg-gray-100 w-full h-8 rounded-2xl pl-3 outline-none text-sm" />
            </div>
            <div className='flex-1'>
                {isLoading && <div className="p-2"><Loading /></div>}
                {dataFilter.length ?
                    dataFilter.map((item, index) => {
                        const isCurrentMessage = item.chatMessages.accountId === profile?.accountID
                        const isActive = item.groups._id === currentItem?.groups._id
                        return (
                            <div
                                onClick={() => setCurrentItem(item)}
                                className={`flex items-center px-2 py-2 cursor-pointer border-b ${isActive ? "bg-gray-100" : ""}`} key={index}>
                                <div className="">
                                    <Image src={`${DB_HOST}/${item.groupSettings.logo}`} alt='' width={40} height={40} className="object-contain border rounded-full" />
                                </div>
                                <div className="flex-1 ml-2 overflow-hidden">
                                    <div className='flex items-center justify-between'>
                                        <h3 className='flex-1 truncate uppercase'>{item.groups.name}</h3>
                                        <span className="text-xs text-gray-400">
                                            <TimeLine date={item.chatMessages.created_at} />
                                        </span>
                                    </div>
                                    <p className="text-xs truncate text-gray-500">
                                        {isCurrentMessage ? "Bạn" : item.accountInfo.fullName}: {item.chatMessages.content ? <span dangerouslySetInnerHTML={{ __html: item.chatMessages.content }} /> : <span>Có {item.chatMessages.files.length} đính kèm.</span>}
                                    </p>
                                </div>
                            </div>
                        )
                    })
                    :
                    Array.isArray(data) ?
                        <div className='flex items-center justify-center p-4'>
                            <p className="text-xs text-gray-400">Không tìm thấy nhóm nào.</p>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default ListGroup
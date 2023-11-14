"use client"
import { ListGroupType } from '@/src/types/groupType'
import TimeLine from '../time-line'
import MenuDropDown from './menu-dropdown'
import InfoGroup from './info-group'
import { useState } from 'react'
import { MenuValueType } from './menu-dropdown/list-data'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/src/constants/query-key'

type Props = {
    onLeftClick?: () => void
}

function HeaderBoxMessage({ onLeftClick }: Props) {
    const { data: ItemGroupType } = useQuery<ListGroupType>({
        queryKey: [queryKeys.group_message.currentItemGroup]
    })

    const [openInfo, setOpenInfo] = useState(false)

    if(!ItemGroupType) return null
    return (
        <div className='flex relative flex-row items-center h-full px-3 z-50'>
            <div onClick={onLeftClick} className="w-8 h-8 flex items-center justify-center cursor-pointer">
                <i className="fa-solid fa-arrow-left text-xl"></i>
            </div>
            <div className='flex-1 ml-2'>
                <h2 className='text-md font-bold uppercase'>{ItemGroupType.groups.name}</h2>
                <p className='text-xs text-gray-400'><TimeLine date={ItemGroupType.chatMessages.created_at} /></p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-300 cursor-pointer">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <MenuDropDown onClickItem={(data) => {
                if (data.path === MenuValueType.INFO) {
                    setOpenInfo(true)
                }
            }} />
            <InfoGroup open={openInfo} onClose={() => setOpenInfo(false)} />
        </div>
    )
}

export default HeaderBoxMessage
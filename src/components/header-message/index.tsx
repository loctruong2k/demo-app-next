"use client"
import { ListGroupType } from '@/src/types/groupType'
import React, { useEffect } from 'react'
import TimeLine from '../time-line'

type Props = {
    dataItem: ListGroupType,
    onLeftClick?: () => void
}

function HeaderBoxMessage({ dataItem, onLeftClick }: Props) {
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.code === "Escape") {
                onLeftClick && onLeftClick();
            }
        })
        return () => {
            window.removeEventListener("keydown", (e) => { })
        }
    }, [])
    return (
        <div className='flex flex-row items-center h-full px-3 z-50'>
            <div onClick={onLeftClick} className="w-8 h-8 flex items-center justify-center cursor-pointer">
                <i className="fa-solid fa-arrow-left text-xl"></i>
            </div>
            <div className='flex-1 ml-2'>
                <h2 className='text-md font-bold uppercase'>{dataItem.groups.name}</h2>
                <p className='text-xs text-gray-400'><TimeLine date={dataItem.chatMessages.created_at} /></p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-blue-300 cursor-pointer">
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className='flex items-center justify-center ml-1 w-8 h-8 rounded-full hover:bg-blue-300 cursor-pointer'>
                <i className="fa-solid fa-bars"></i>
            </div>
        </div>
    )
}

export default HeaderBoxMessage
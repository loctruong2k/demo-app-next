import React from 'react'
import { LikeMessageType } from '../../list-message/type'
import { statusList } from '@/src/components/messafe-like/data'

type Props = {
    data: LikeMessageType[]
}

function RenderLike({ data }: Props) {
    const formatData = () => {
        return statusList.map((item, index) => {
            return {
                ...item,
                amount: data.filter(i => i.value === item.id).length
            }
        })
    }
    const likes = formatData()
    return (
        <div className='flex items-center min-w-[32px]'>
            {likes.map((item, index) => {
                if (!item.amount) return null
                return <span className="text-gray-400 text-xs ml-1" key={index}>{item.amount} {item.text}</span>
            })}
        </div>
    )
}

export default RenderLike
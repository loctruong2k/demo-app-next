"use client"

import { useFormMessage } from "./message-form-context/hook"

function MessageEmpty() {
    const { data } = useFormMessage()
    return (
        <div className='flex h-full w-full items-center justify-end'>
            <span className='text-center w-full text-gray-400'>Bạn chưa từng nhắn tin cho {data.userInfo?.fullName}</span>
        </div>
    )
}

export default MessageEmpty
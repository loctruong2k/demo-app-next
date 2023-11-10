"use client"
import { emitKeys } from '@/src/constants/emitKeys'
import { useSocket } from '@/src/socket-io/container/hook'
import { useEffect, useRef, useState } from 'react'
import { useFormMessage } from '../message-account/message-form-context/hook'
import { statusList } from './data'
import { LikeMessageForm, MessageLikeType } from './type'

type Props = {
    id: string;
    isCurrent?: boolean;
}


function MessageLike({ id, isCurrent }: Props) {
    const [open, setOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)
    const parentRef = useRef<HTMLDivElement>(null)

    const { data } = useFormMessage()
    const socket = useSocket()

    useEffect(() => {
        if (!open) return;
        adjustPopupPosition()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    function adjustPopupPosition() {
        if (!parentRef.current || !popupRef.current) return
        const position = parentRef.current.getBoundingClientRect()
        const widthScreen = window.innerWidth
        var popupWidth = popupRef.current.offsetWidth;
        const rightPosition = widthScreen - position.x
        if(isCurrent){
            popupRef.current.style.left = `-20px`
            return
        }
        if (rightPosition < popupWidth) {
            popupRef.current.style.right = `-20px`
        }
    }
    const onClickItem = (item: MessageLikeType) => {
        setOpen(false)
        if (!socket) return
        const form: LikeMessageForm = {
            groupId: data.id,
            chatId: id,
            value: item.id
        }
        socket.emit(emitKeys.message.likeMessage, form)
    }

    return (
        <>
            <div ref={parentRef} className="relative w-6 h-6 flex item-center justify-center ">
                <i onClick={() => setOpen(!open)} className="fa-solid fa-face-smile text-xs font-bold text-gray-500 cursor-pointer"></i>
                <div ref={popupRef} className={`${!open && "hidden"} top-[-10px] shadow rounded-3xl absolute h-10 bg-white z-[99999] flex items-center justify-center px-3`}>
                    {statusList.map((item, index) => {
                        return <span onClick={() => onClickItem(item)} className='flex-1 px-1 mx-1 cursor-pointer transition-all duration-100 hover:scale-150 hover:bg-blue-200 rounded-full' key={index}>{item.text}</span>
                    })}
                </div>
            </div>
            <div onClick={() => setOpen(false)} className={`${!open && "hidden"} left-0 top-0 fixed w-screen h-screen z-[99998]`} />
        </>
    )
}

export default MessageLike
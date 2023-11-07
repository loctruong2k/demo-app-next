import React, { useRef } from 'react'
import './index.css'
interface Props {
    onClick: () => void,
    disabled?: boolean
}

function SendButton({ onClick, disabled = true }: Props) {
    const divRef = useRef<HTMLButtonElement>(null)
    const onSendMessage = () => {
        onClick()
        if (!divRef.current) return
        divRef.current.classList.add("animation-custom")
        setTimeout(() => {
            if (!divRef.current) return
            divRef.current.classList.remove("animation-custom")
        }, 2000);
    }
    return (
        <button
            onClick={onSendMessage}
            ref={divRef}
            id="button-send-message"
            disabled={disabled}
            className='w-10 h-10 mr-2 flex items-center justify-center cursor-pointer'>
            <i className="fa-solid fa-paper-plane text-xl text-blue-500"></i>
        </button>
    )
}

export default SendButton
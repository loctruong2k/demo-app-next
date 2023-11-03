import React from 'react'

interface Props {
    loading: boolean,
    onClick: () => void,
    disabled?: boolean
}

function SendButton({ loading, onClick, disabled = false }: Props) {
    return (
        <div
            onClick={onClick}
            className='w-10 h-10 mr-2 flex items-center justify-center cursor-pointer'>
            <i className="fa-solid fa-paper-plane text-xl text-blue-500"></i>
        </div>
    )
}

export default SendButton
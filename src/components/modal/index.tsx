"use client"
import React from 'react'
import './index.css'
type Props = {
    open: boolean;
    onClose: () => void;
    className?: string;
    children?: React.ReactNode
}

const Modal = (props: Props) => {
    return (
        <div className={`fixed modal-container ${!props.open && "hidden"} z-50 top-0 left-0 w-screen h-screen flex items-center justify-center transition-opacity`}>
            <div className={`bg-white ${props.className} z-40`}>
                {props.children}
            </div>
            <div className="content-modal fixed w-screen h-screen z-30" onClick={props.onClose}/>
        </div>
    )
}

export default Modal
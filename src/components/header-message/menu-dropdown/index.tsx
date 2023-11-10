import React, { Fragment, useState } from 'react'
import { ListMenuHeader } from './list-data'

type Props = {}

function MenuDropDown({ }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <Fragment>
            <div onClick={() => setOpen(true)} className='flex items-center justify-center ml-1 w-8 h-8 rounded-full hover:bg-blue-300 cursor-pointer'>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div className={`absolute ${!open && "hidden"} top-14 shadow-lg right-4 rounded z-[999] bg-white w-40`}>
                <ul className='py-2'>
                    {ListMenuHeader.map((item, index) => {
                        return (
                            <li
                                className={`flex items-center px-4 py-1 cursor-pointer hover:bg-gray-100 ${item.className}`}
                                key={index}>
                                {item.icon}
                                <span className="ml-1">{item.name}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div onClick={() => setOpen(false)} className={`${!open && "hidden"} fixed left-0 top-0 w-screen h-screen z-[998]`} />
        </Fragment>
    )
}

export default MenuDropDown
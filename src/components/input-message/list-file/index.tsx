"use client"
import { renderFileType } from '@/src/helpers/renderTypeFile'
import Image from 'next/image'
import React from 'react'

type Props = {
    files: File[],
    onDelete: (index: number) => void
}

const ListFile = ({ files, onDelete }: Props) => {
    if (!files.length) return null
    return (
        <div className="bottom-14 flex overflow-auto items-center w-full py-1">
            {files.map((item, index) => {
                return <div key={index}
                    className='flex items-center bg-slate-200 rounded-lg p-2 ml-2 max-w-[250px]'
                >
                    <div className="w-6">
                        <Image src={renderFileType(item.name)} alt='' width={24} height={24} />
                    </div>
                    <div className='ml-2 flex-1'>
                        <p className='truncate max-w-[180px] text-xs text-gray-500'>{item.name}</p>
                    </div>
                    <div
                        onClick={() => onDelete(index)}
                        className='w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-slate-300 rounded-full'>
                        <i className="fa-solid fa-xmark text-gray-600"></i>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ListFile
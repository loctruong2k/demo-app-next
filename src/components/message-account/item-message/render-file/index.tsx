"use client"
/* eslint-disable @next/next/no-img-element */
import { DB_HOST } from '@/src/api/config'
import { FileMessageData } from '@/src/api/uploads/message/type'
import { renderFileType } from '@/src/helpers/renderTypeFile'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
    item: FileMessageData,
    index: number,
    isCurrent: boolean
}

const renderSizeFile = (size: number) => {
    if (size < 1024) return `${size}B`
    if (size > 1024) return `${Math.floor(size / 1024)}Kb`
    if (size > 1024 * 1024) return `${Math.floor(size / 1024 / 2014)}Mb`
    if (size > 1024 * 1024 * 1024) return `${Math.floor(size / 1024 / 2014 / 1024)}Gb`
}

function RenderFiles({ item, isCurrent }: Props) {
    const background = isCurrent ? "bg-blue-100" : "bg-white"
    const downloadFile = () => {
        const url = `${DB_HOST}/${item.url}`
        axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const href = URL.createObjectURL(response.data);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', item.name);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    };

    return (
        <div onClick={downloadFile} className={`group flex flex-row items-center border border-gray-100 max-w-[60vw] mt-1 p-2 rounded-xl cursor-pointer ${background}`}>
            <div className='w-[32px]'>
                <Image src={renderFileType(item.name)} alt='' width={24} height={24} />
            </div>
            <div className="flex overflow-hidden flex-col ml-1 flex-1">
                <h3 className='truncate text-xs text-gray-600'>{item.name}</h3>
                <div className='flex flex-row items-center justify-between'>
                    <span className="text-xs text-gray-400">{renderSizeFile(item.size)}</span>
                </div>
            </div>
            <div className='ml-2 flex items-center justify-center opacity-0 group-hover:opacity-1'>
                <i className="fa-regular fa-circle-down"></i>
            </div>
        </div>
    )
}

export default React.memo(RenderFiles)
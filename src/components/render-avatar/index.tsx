import { DB_HOST } from '@/src/api/config'
import Image from 'next/image'
import React, { Fragment } from 'react'

type Props = {
    url: string
}

function RenderAvatar({ url }: Props) {
    return (
        <Fragment>
            {url ?
                <Image src={`${DB_HOST}/${url}`} alt='' width={40} height={40} className='rounded-full border' />
                :
                <div className="w-[40px] h-[40px] bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user text-2xl"></i>
                </div>
            }
        </Fragment>
    )
}

export default RenderAvatar
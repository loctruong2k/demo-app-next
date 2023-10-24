import Image from 'next/image'
import React from 'react'
type Props = {}

function NotFound({ }: Props) {
    return (
        <div className='not-page'>
            <Image src='/assets/not-page/not-page.jpeg' alt='' width={500} height={500} />
        </div>
    )
}

export default NotFound
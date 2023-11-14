"use client"
/* eslint-disable @next/next/no-img-element */
import { DB_HOST } from '@/src/api/config';
import { FileMessageData } from '@/src/api/uploads/message/type';
import { PhotoView } from 'react-photo-view';
type Props = {
    images: FileMessageData[],
    isCurrent: boolean
}

function RenderImage({ images, isCurrent }: Props) {
    let colCount = "grid-cols-3";

    if (images.length && images.length <= 2) {
        colCount = `grid-cols-${images.length}`;
    } 
    const background = isCurrent ? "bg-blue-100" : "bg-white"
    
    return (
        <div className={`grid ${colCount} gap-2 max-w-[60vw] 2xl:max-w-[40vw]`}>
            {images.length > 0 ? images.map((item, index) => {
                return <div key={index} className={`cursor-pointer ${background} ${index === 0 && "col-span-1"} rounded-lg border shadow`}>
                    <PhotoView src={`${DB_HOST}/${item.url}`}>
                        <img src={`${DB_HOST}/${item.url}`} alt='' className='w-full rounded h-full object-contain' />
                    </PhotoView>
                </div>
            }) : null}
        </div>
    )
}

export default RenderImage
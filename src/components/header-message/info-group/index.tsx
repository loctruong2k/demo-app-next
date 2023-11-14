import React, { useEffect } from 'react'
import Modal from '../../modal';
import { useQuery } from '@tanstack/react-query';
import { ListGroupType } from '@/src/types/groupType';
import { queryKeys } from '@/src/constants/query-key';
import { DB_HOST } from '@/src/api/config';
import Image from 'next/image';
import { useSocket } from '@/src/socket-io/container/hook';
import { emitKeys } from '@/src/constants/emitKeys';
import { ImageType, MemberType } from './type';
import RenderAvatar from '../../render-avatar';
import { PhotoProvider, PhotoView } from 'react-photo-view';

type Props = {
    open: boolean;
    onClose: () => void;
}

function InfoGroup({ open, onClose }: Props) {
    const socket = useSocket()

    const { data: ItemGroupType } = useQuery<ListGroupType>({
        queryKey: [queryKeys.group_message.currentItemGroup]
    })

    const { data: listMembers } = useQuery<MemberType[]>({
        queryKey: [queryKeys.group_message.listMember, ItemGroupType?.groups._id],
    })

    const { data: listImages } = useQuery<ImageType[]>({
        queryKey: [queryKeys.group_message.listImage, ItemGroupType?.groups._id]
    })

    useEffect(() => {
        if (!socket || !ItemGroupType) return
        socket.emit(emitKeys.group.listMember, ItemGroupType.groups._id)
        socket.emit(emitKeys.group.listImages, ItemGroupType.groups._id)
    }, [socket, ItemGroupType])

    return (
        <div className={`fixed w-screen md:w-[400px] h-screen z-[999] bg-slate-100 top-0 right-0 ${open ? "translate-x-0" : "translate-x-[100vw] md:translate-x-[400px]"} duration-300`}>
            <div className='h-full flex flex-col'>
                <div className='flex px-2 py-1 items-center border-b bg-white'>
                    <span
                        onClick={() => {
                            onClose()
                        }}
                        className="cursor-pointer p-2">
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </span>
                    <span className="flex-1 text-center font-medium">Thông tin hội thoại</span>
                    <span
                        className="p-2 opacity-0">
                        <i className="fa-solid fa-arrow-left text-lg"></i>
                    </span>
                </div>
                <div className='flex flex-col items-center justify-center py-4 bg-white shadow-sm'>
                    {ItemGroupType?.groupSettings.logo ?
                        <Image className="rounded-full" width={60} height={60} src={`${DB_HOST}/${ItemGroupType?.groupSettings.logo}`} alt='' />
                        :
                        <span className="rounded-full w-[60px] h-[60px] bg-slate-300" />
                    }
                    <div className='flex items-center p-2'>
                        <span className="truncate">{ItemGroupType?.groups.name}</span>
                        <i className="fa-solid fa-pen text-gray-500 cursor-pointer px-2"></i>
                    </div>
                </div>
                <div className='flex flex-col justify-center py-4 bg-white shadow-sm mt-2 px-4'>
                    <h3 className="font-medium">Thành viên ({listMembers?.length || 0})</h3>
                    <div className='flex flex-row items-center flex-wrap'>
                        {Array.isArray(listMembers) ?
                            listMembers.map((item, index) => {
                                return <div key={index} className='mx-1'>
                                    <RenderAvatar url={item.info.avatar} />
                                    <span className="text-xs text-gray-500">{item.info.fullName}</span>
                                </div>
                            })
                            : null
                        }
                    </div>
                </div>
                <div className='flex flex-col justify-center py-4 bg-white shadow-sm mt-2 px-4'>
                    <h3 className="font-medium">Hình ảnh</h3>
                    <PhotoProvider>
                        <div className='flex flex-row items-center flex-wrap'>
                            {Array.isArray(listImages) ?
                                listImages.map((item, index) => {
                                    const url = `${DB_HOST}/${item.url}`
                                    return <div key={index} className='w-[calc(100%/6)] flex items-center justify-center cursor-pointer'>
                                        <PhotoView src={url}>
                                            <Image src={url} alt='' width={80} height={60} className="object-contain bg-slate-100" />
                                        </PhotoView>
                                    </div>
                                })
                                : null
                            }
                        </div>
                        {Array.isArray(listImages) ?
                            <div className='flex items-center justify-center mx-16 mt-2'>
                                <span className='py-2 px-4 bg-slate-300 cursor-pointer rounded font-medium'>Xem tất cả</span>
                            </div>
                            :
                            null
                        }
                    </PhotoProvider>
                </div>
            </div>
        </div>
    )
}

export default InfoGroup
"use client"
import { DB_HOST } from '@/src/api/config'
import { getInfo } from '@/src/api/info'
import { PATH } from '@/src/constants/path'
import { queryKeys } from '@/src/constants/query-key'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { onOpen } from '../auth-menu/hook'
import Modal from '../modal'
import { Fragment, useState } from 'react'
import ModalSearchUser from '../modal-create-friend'

function HeaderPage() {
    const [isSearch, setSearch] = useState(false)
    const { data: token } = useQuery<string>({
        queryKey: [queryKeys.token]
    })
    const { data: profile, isLoading } = useQuery({
        queryKey: [queryKeys.profile],
        queryFn: getInfo,
        enabled: !!token,
    })

    return (
        <Fragment>
            <div className='shadow-md z-10'>
                <div className='flex py-2 px-4 bg-white xl:max-w-[1366px] m-auto'>
                    <div className='flex items-center flex-1'>
                        <Link href={PATH.home}>
                            <Image quality={75} className="rounded-full" src={"/assets/logo.jpg"} alt='' width={40} height={40} />
                        </Link>
                        <div className='relative group w-9 h-9 cursor-pointer flex items-center justify-center ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-solid fa-bars"></i>
                            <div className="absolute text-center top-12 min-w-max bg-slate-300 text-slate-700 text-sm px-2 py-1 rounded mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                Thiết lập
                            </div>
                        </div>
                    </div>
                    <div className='flex'>
                        <div onClick={() => setSearch(true)} className='relative group w-9 h-9 cursor-pointer flex items-center justify-center bg-slate-100 ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-solid fa-plus"></i>
                            <div className="absolute text-center top-12 min-w-max bg-slate-300 text-slate-700 text-sm px-2 py-1 rounded mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                Tạo mới
                            </div>
                        </div>
                        <div className='relative group w-9 h-9 cursor-pointer flex items-center justify-center bg-slate-100 ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-regular fa-bell"></i>
                            <div className="absolute text-center top-12 min-w-max bg-slate-300 text-slate-700 text-sm px-2 py-1 rounded mt-2 opacity-0 group-hover:opacity-100 transition duration-300">
                                Thông báo
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                onOpen()
                            }}
                            className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center ml-2 bg-slate-100">
                            {profile?.avatar ?
                                <Image priority className="rounded-full object-contain shadow" src={`${DB_HOST}/${profile.avatar}`} alt='' width={40} height={40} />
                                :
                                <i className="fa-solid fa-user text-xl"></i>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ModalSearchUser open={isSearch} onClose={() => setSearch(false)} />
        </Fragment>
    )
}

export default HeaderPage
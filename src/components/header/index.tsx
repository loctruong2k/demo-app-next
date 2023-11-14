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
import { Fragment, useRef, useState } from 'react'
import ModalSearchUser from '../modal-create-friend'
import AuthMenu from '../auth-menu'
import { useMessageSocket } from '@/src/hooks/message/useMessage'
import { useNotifications } from '@/src/hooks/notification'
import { useRouter } from 'next/navigation'
import { useGroupDetail } from '@/src/hooks/group'

function HeaderPage() {
    const router = useRouter()
    const [isSearch, setSearch] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const { data: token } = useQuery<string>({
        queryKey: [queryKeys.token]
    })
    const { data: profile } = useQuery({
        queryKey: [queryKeys.profile],
        queryFn: getInfo,
        enabled: !!token,
    })
    useMessageSocket()
    useNotifications()
    useGroupDetail()

    return (
        <Fragment>
            <div id={'header-app'} ref={ref} className='shadow-md bg-white z-[9] fixed top-0 w-screen'>
                <div className='flex py-2 px-4 bg-white xl:max-w-[1366px] m-auto'>
                    <div className='flex items-center flex-1'>
                        <Link href={PATH.home}>
                            <Image quality={75} className="rounded-full" src={"/assets/logo.jpg"} alt='' width={40} height={40} />
                        </Link>
                        <div className='w-9 h-9 cursor-pointer flex items-center justify-center ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-solid fa-bars"></i>
                        </div>
                    </div>
                    <div className='flex'>
                        <div onClick={() => setSearch(true)} className='w-9 h-9 cursor-pointer flex items-center justify-center bg-slate-100 ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                        <div
                            onClick={() => router.push(PATH.message)}
                            className='w-9 h-9 cursor-pointer flex items-center justify-center bg-slate-100 ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-regular fa-message"></i>
                        </div>
                        <div className='w-9 h-9 cursor-pointer flex items-center justify-center bg-slate-100 ml-2 rounded-full hover:bg-slate-300'>
                            <i className="fa-regular fa-bell"></i>
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
            <div style={{ height: 56 }} />
            <AuthMenu />
            <ModalSearchUser open={isSearch} onClose={() => setSearch(false)} />
        </Fragment>
    )
}

export default HeaderPage
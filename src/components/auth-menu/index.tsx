"use client"
import React, { Fragment } from 'react'
import { ListMenuData, MenuPathValue, MenuType } from './list-menu'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/src/constants/query-key'
import { InfoData } from '@/src/api/info/type'
import Image from 'next/image'
import { DB_HOST } from '@/src/api/config'
import { onClose } from './hook'
import './index.css'
import { queryClient } from '../check-login'
import { useRouter } from 'next/navigation'
import { PATH } from '@/src/constants/path'

function AuthMenu() {
    const router = useRouter()
    const { data: profile } = useQuery<InfoData>({
        queryKey: [queryKeys.profile]
    })
    const handleItem = (item: MenuType) => {
        if (item.path === MenuPathValue.logout) {
            localStorage.clear();
            queryClient.clear();
            router.replace(PATH.login)
            return
        }
    }
    return (
        <div id="auth-menu" className='hidden'>
            <div
                className="background-auth-menu fixed right-2 top-16 z-40 bg-white shadow py-4 px-2 min-w-[200px] rounded-sm"
            >
                <ul>
                    <li>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='w-10 h-10 bg-slate-200 flex items-center justify-center rounded-full overflow-hidden'>
                                {profile?.avatar ?
                                    <Image src={`${DB_HOST}/${profile?.avatar}`} alt='' width={40} height={40} className="object-contain" />
                                    :
                                    <i className="fa-solid fa-user text-xl"></i>
                                }
                            </div>
                            <div>
                                <h3 className="font-bold uppercase py-1">{profile?.fullName}</h3>
                            </div>
                        </div>
                    </li>
                    {ListMenuData.map((item, index) => {
                        return (
                            <li onClick={() => handleItem(item)} className={`py-1.5 cursor-pointer hover:bg-slate-300 px-2 rounded-sm ${item.className}`} key={index}>
                                {item.icon} <span className='pl-2'>{item.title}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div onClick={onClose} className="fixed top-0 left-0 w-screen h-screen z-[39]" />
        </div>
    )
}

export default AuthMenu
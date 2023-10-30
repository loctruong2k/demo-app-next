"use client"
import { DB_HOST } from '@/src/api/config';
import { searchFullName } from '@/src/api/info';
import { InfoData } from '@/src/api/info/type';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import Empty from '../../empty';
import { useRouter } from 'next/navigation';
import { PATH } from '@/src/constants/path';
import Link from 'next/link';

type Props = {
    onClose: () => void
}

function SearchName({ onClose }: Props) {
    const router = useRouter()
    const [keyword, setKeyword] = useState<string>("")
    const [data, setData] = useState<InfoData[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
    const onSearchName = (e: string) => {
        setKeyword(e)
        if (!loading) {
            setLoading(true)
        }
        if (timer.current) {
            clearTimeout(timer.current)
        }
        if (!e) {
            setData([])
            setLoading(false)
            return
        }
        timer.current = setTimeout(() => {
            getDataListName(e)
        }, 1000)
    }
    const getDataListName = async (txt: string) => {
        const res = await searchFullName(txt)
        setLoading(false)
        if (!res) return
        setData(res)
    }
    return (
        <div className=''>
            <div className="flex items-center">
                <div className='mx-2 w-full my-4'>
                    <input
                        value={keyword}
                        onChange={e => onSearchName(e.target.value)}
                        className='h-10 outline-none bg-slate-100 w-full pl-2 rounded'
                        placeholder='Tìm kiếm theo tên ...'
                    />
                </div>
            </div>
            <div className={`w-full flex items-center justify-center p-2 ${!loading && "hidden"}`}>
                <div className={`w-4 h-4 border-t-2 mr-2 border-blue-200 border-solid rounded-full animate-spin`} />
            </div>
            <div className="">
                {data.length > 0 ? data.map((item, index) => {
                    return <Link
                        href={`${PATH.info}/${item.slug}`}
                        onClick={onClose}
                        key={index} className='p-2 m-2 flex border-b'>
                        <div className='flex items-center justify-center bg-slate-50 w-[40px] h-[40px] rounded-full'>
                            {item.avatar ?
                                <Image src={`${DB_HOST}/${item.avatar}`} alt='' width={48} height={48} className="rounded-full" />
                                :
                                <i className="fa-solid fa-user text-xl"></i>
                            }
                        </div>
                        <div className='flex flex-col ml-2'>
                            <h3 className="text-sm font-bold">{item.fullName}</h3>
                            <p className="text-xs text-gray-400 truncate">{item.numberPhone || item.description || item.address || item.birthday && moment(item.birthday).format('DD/MM/YYYY') || "Không có thông tin thêm."}</p>
                        </div>
                    </Link>
                })
                    :
                    keyword ?
                        <Empty />
                        :
                        <div className='flex items-center justify-center'>
                            <span className="text-xs text-gray-400">Nhập từ khoá để tìm kiếm theo tên của người dùng</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default SearchName
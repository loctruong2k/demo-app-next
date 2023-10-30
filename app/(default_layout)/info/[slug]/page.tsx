"use client"
import { DB_HOST } from '@/src/api/config'
import { addFriend, unFriend } from '@/src/api/friend'
import { getInfoSlug } from '@/src/api/info'
import { InfoSlugData } from '@/src/api/info/type'
import { useToast } from '@/src/components/toast/hook'
import { queryKeys } from '@/src/constants/query-key'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'
interface Props {
    params: {
        slug: string
    }
}
function InfoAccount({ params }: Props) {
    // lấy thông tin người dùng
    const toast = useToast()
    const { data } = useQuery({
        queryKey: [queryKeys.profile, params.slug],
        queryFn: async () => {
            const res = await getInfoSlug(params.slug)
            return res
        },
        enabled: !!params.slug
    })
    const info = data?.info
    const friend = data?.friend
    const requestFriend = async () => {
        if (!info) return
        if (friend) {
            try {
                await unFriend(info.accountID)
            } catch (error) {
                toast.error({
                    message: error + ""
                })
            }
        } else {
            try {
                const res = await addFriend(info.accountID)
                if (res) {
                    toast.success({
                        message: "Đã gửi yêu cầu kết bạn."
                    })
                }
            } catch (error) {
                toast.error({
                    message: error + ""
                })
            }
        }
    }
    return (
        <div className="flex flex-col max-w-[1366px] m-auto my-2 px-4">
            <div
                style={{
                    backgroundImage: `url(${DB_HOST}/${info?.background})`
                }}
                className="bg-slate-400 h-[35vh] rounded flex items-end justify-center">
                <div className="w-32 h-32 bg-slate-100 mb-[-64px] rounded-full border-white border-8 border-spacing-10 overflow-hidden">
                    {
                        info?.avatar && <Image src={`${DB_HOST}/${info.avatar}`} alt='' width={128} height={128} className="object-contain" />
                    }
                </div>
            </div>
            <div className="mt-16 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-center"><i className="fa-solid fa-star text-orange-500 mr-1"></i>{info?.fullName}</h2>
                <p className="text-gray-400 text-center">{info?.description || "Không có gì phải mô tả thêm."}</p>
            </div>
            <div className="flex items-center justify-center mt-2">
                <div
                    onClick={requestFriend}
                    className="bg-slate-100 py-2 px-4 mr-2 rounded cursor-pointer">
                    {friend ? <i className="fa-solid fa-user-slash mr-1"></i> : <i className="fa-solid fa-user-plus mr-1"></i>}
                    {friend ? "Huỷ kết bạn" : "Thêm bạn"}
                </div>
                <div className="bg-blue-400 text-white py-2 px-4 rounded cursor-pointer">
                    <i className="fa-regular fa-message mr-1"></i>
                    Nhắn tin
                </div>
            </div>
            <div className="flex flex-wrap w-full mt-4">
                <div className="w-full md:w-1/2 md:p-4">
                    <div className='shadow p-4 rounded min-h-[200px]'>
                        <div className='py-2 border-b'>
                            <h3 className="font-bold">Thông tin cá nhân</h3>
                        </div>
                        <div className='flex items-center justify-center my-2'>
                            <p className="text-gray-400">Chức năng đang cập nhật</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 md:p-4">
                    <div className='shadow p-4 rounded min-h-[200px]'>
                        <div className='py-2 border-b'>
                            <h3 className="font-bold">Hình ảnh</h3>
                        </div>
                        <div className='flex items-center justify-center my-2'>
                            <p className="text-gray-400">Chức năng đang cập nhật</p>
                        </div>
                    </div>
                </div>
                <div className="w-full md:p-4">
                    <div className='shadow p-4 rounded min-h-[200px]'>
                        <div className='py-2 border-b'>
                            <h3 className="font-bold">Hoạt động gần đây</h3>
                        </div>
                        <div className='flex items-center justify-center my-2'>
                            <p className="text-gray-400">Chức năng đang cập nhật</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoAccount
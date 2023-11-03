"use client"
import { DB_HOST } from '@/src/api/config'
import { addFriend, unFriend } from '@/src/api/friend'
import { getInfoSlug } from '@/src/api/info'
import { InfoData } from '@/src/api/info/type'
import { queryClient } from '@/src/components/check-login'
import { useToast } from '@/src/components/toast/hook'
import { emitKeys } from '@/src/constants/emitKeys'
import { PATH } from '@/src/constants/path'
import { queryKeys } from '@/src/constants/query-key'
import { useSocket } from '@/src/socket-io/container/hook'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
interface Props {
    params: {
        slug: string
    }
}
function InfoAccount({ params }: Props) {
    // lấy thông tin người dùng
    const router = useRouter()
    const socket = useSocket()
    const toast = useToast()
    const { data: profile } = useQuery<InfoData>({
        queryKey: [queryKeys.profile]
    })
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

    const [loading, setLoading] = useState({
        loadingMessage: false,
        loadingFriend: false
    })

    useEffect(() => {
        if (!socket) return
        socket.on(emitKeys.group.idAccount, (data) => {
            if (data.success) {
                if (data.isGroup) {
                    setLoading(prev => ({
                        ...prev,
                        loadingMessage: false
                    }))
                    router.push(`${PATH.message}/${data.data._id}`)
                    return
                }
                socket?.emit(emitKeys.group.create, {
                    name: `${profile?.fullName},${info?.fullName}}`,
                    members: [info?.accountID],
                })
                return
            }
            toast.warning({
                message: `Không thể nhắn tin cho ${info?.fullName} ngay lúc này.`
            })
            setLoading(prev => ({
                ...prev,
                loadingMessage: false
            }))
        })
        socket.on(emitKeys.group.create, (data) => {
            if (data.success) {
                setLoading(prev => ({
                    ...prev,
                    loadingMessage: false
                }))
                router.push(`${PATH.message}/${data.data.group._id}`)
            } else {
                setLoading(prev => ({
                    ...prev,
                    loadingMessage: false
                }))
                toast.warning({
                    message: `Không thể nhắn tin cho ${info?.fullName} ngay lúc này.`
                })
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket])
    const requestFriend = async () => {
        if (!info) return
        setLoading(prev => ({
            ...prev,
            loadingFriend: true
        }))
        if (friend) {
            try {
                const res = await unFriend(info.accountID)
                if (!res) {
                    setLoading(prev => ({
                        ...prev,
                        loadingFriend: false
                    }))
                    return
                }
                queryClient.setQueryData([queryKeys.profile, params.slug], { ...data, friend: null })
                setLoading(prev => ({
                    ...prev,
                    loadingFriend: false
                }))
            } catch (error) {
                toast.error({
                    message: error + ""
                })
                setLoading(prev => ({
                    ...prev,
                    loadingFriend: false
                }))
            }
        } else {
            try {
                const res = await addFriend(info.accountID)
                if (res) {
                    queryClient.setQueryData([queryKeys.profile, params.slug], { ...data, friend: res })
                    toast.success({
                        message: "Đã gửi yêu cầu kết bạn."
                    })
                }
                setLoading(prev => ({
                    ...prev,
                    loadingFriend: false
                }))
            } catch (error) {
                toast.error({
                    message: error + ""
                })
                setLoading(prev => ({
                    ...prev,
                    loadingFriend: false
                }))
            }
        }
    }
    return (
        <div className="flex flex-col max-w-[1366px] m-auto my-2 px-4">
            <div
                style={info?.background ? {
                    backgroundImage: `url(${DB_HOST}/${info?.background})`
                } : {}}
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
                    className="bg-slate-100 py-2 px-4 mr-2 rounded cursor-pointer flex items-center">
                    {loading.loadingFriend ? <div className={`w-4 h-4 border-t-2 mr-2 border-blue-200 border-solid rounded-full animate-spin`} /> : friend ? <i className="fa-solid fa-user-slash mr-1"></i> : <i className="fa-solid fa-user-plus mr-1"></i>}
                    {friend ? friend.status === "request" ? "Chờ kết bạn" : "Huỷ kết bạn" : "Thêm bạn"}
                </div>
                <div onClick={() => {
                    if (!socket) return
                    setLoading(prev => ({
                        ...prev,
                        loadingMessage: true
                    }))
                    socket.emit(emitKeys.group.idAccount, info?.accountID)
                }} className="bg-blue-400 text-white py-2 px-4 rounded cursor-pointer flex items-center">
                    {loading.loadingMessage ? <div className={`w-4 h-4 border-t-2 mr-2 border-blue-200 border-solid rounded-full animate-spin`} /> : <i className="fa-regular fa-message mr-1"></i>}
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
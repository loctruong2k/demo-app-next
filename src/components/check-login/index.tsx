"use client"
import { verifyTokenAPI } from '@/src/api/auth'
import { getInfo } from '@/src/api/info'
import { keyPath } from '@/src/constants/keyPath'
import { PATH } from '@/src/constants/path'
import { queryKeys } from '@/src/constants/query-key'
import { handleLogout } from '@/src/helpers/handleLogout'
import { ContainerSocket } from '@/src/socket-io/container'
import { HydrationBoundary, QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

type Props = {
    children: React.ReactNode
}
const publicPath = [PATH.login, PATH.register, PATH.forgotPassword]
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    }
})
function AuthRequest({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const disableAPI = useRef<boolean>(false)
    useEffect(() => {
        const token = localStorage.getItem(keyPath.token)
        if (token && !disableAPI.current) {
            disableAPI.current = true
            verifyToken()
        }
        if (publicPath.includes(pathname)) {
            if (token) {
                router.replace(PATH.home)
            }
            return
        }
        if (!token) {
            router.replace(PATH.login)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])

    const verifyToken = async () => {
        try {
            const res = await verifyTokenAPI()
            if (!res?.success) {
                return handleLogout(queryClient)
            }
            queryClient.setQueryData([queryKeys.token], localStorage.getItem(keyPath.token))
            const info = await getInfo()
            queryClient.setQueryData([queryKeys.profile], info)
        } catch (error) {
            return handleLogout(queryClient)
        }
    }
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary>
                <ContainerSocket>
                    {children}
                </ContainerSocket>
            </HydrationBoundary>
        </QueryClientProvider>
    )
}

export default AuthRequest
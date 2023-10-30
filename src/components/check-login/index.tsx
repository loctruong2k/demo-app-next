"use client"
import { verifyTokenAPI } from '@/src/api/auth'
import { PATH } from '@/src/constants/path'
import { queryKeys } from '@/src/constants/query-key'
import { handleLogout } from '@/src/helpers/handleLogout'
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
        const token = localStorage.getItem("xyz")
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
        const res = await verifyTokenAPI()
        if (!res?.success) {
            handleLogout(queryClient)
        }
    }
    return (

        <QueryClientProvider client={queryClient}>
            <HydrationBoundary>{children}</HydrationBoundary>
        </QueryClientProvider>
    )
}

export default AuthRequest
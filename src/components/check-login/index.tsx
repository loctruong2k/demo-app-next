"use client"

import { PATH } from '@/src/constants/path'
import { queryKeys } from '@/src/constants/query-key'
import { HydrationBoundary, QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'

type Props = {
    children: React.ReactNode
}
const publicPath = [PATH.login, PATH.register]
export const queryClient = new QueryClient()
function AuthRequest({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    
    useEffect(() => {
        const token = localStorage.getItem("xyz")
        if(token){
            queryClient.setQueryData([queryKeys.token], token)
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

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary>{children}</HydrationBoundary>
        </QueryClientProvider>
    )
}

export default AuthRequest
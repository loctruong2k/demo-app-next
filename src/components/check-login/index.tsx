"use client"

import { PATH } from '@/src/constants/path'
import { usePathname, useRouter } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'

type Props = {
    children: React.ReactNode
}
const publicPath = [PATH.login, PATH.register]
function AuthRequest({ children }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        if (publicPath.includes(pathname)) return
        const token = localStorage.getItem("xyz")
        if (!token) {
            router.replace(PATH.login)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname])
    return (
        <Fragment>{children}</Fragment>
    )
}

export default AuthRequest
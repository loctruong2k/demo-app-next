import AuthMenu from '@/src/components/auth-menu'
import HeaderPage from '@/src/components/header'
import { Inter } from 'next/font/google'
import { Fragment } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {
    return (
        <Fragment>
            <div className='w-screen h-full'>
                {children}
            </div>
        </Fragment>
    )
}

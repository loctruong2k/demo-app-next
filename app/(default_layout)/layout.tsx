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
            <div className={`flex h-screen w-screen flex-col relative ${inter.className}`} style={inter.style}>
                <HeaderPage />
                <div className="flex-1 h-[calc(100vh-56px)]">
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

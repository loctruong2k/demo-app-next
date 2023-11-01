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
            <div className={`flex flex-col relative ${inter.className}`} style={inter.style}>
                <HeaderPage />

                <div className="fex-1">
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

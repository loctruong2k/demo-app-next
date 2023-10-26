import AuthRequest from '@/src/components/check-login'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { APP_NAME } from '../src/api/config'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: `${APP_NAME}`,
    description: `Chào mừng bạn đến với ${APP_NAME}`,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthRequest>
                    {children}
                </AuthRequest>
            </body>
        </html>
    )
}

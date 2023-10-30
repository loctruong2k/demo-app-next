import AuthRequest from '@/src/components/check-login'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { APP_NAME } from '../src/api/config'
import './globals.css'
import Head from 'next/head'
import Script from 'next/script'
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
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                    integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA=="
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                />
            </head>
            <body className={`${inter.className} min-w-[325px]`}>
                <AuthRequest>
                    {children}
                    <div id={"box-message"} className="fixed z-[999999] top-4 right-4"></div>
                </AuthRequest>
            </body>
        </html>
    ) 
}

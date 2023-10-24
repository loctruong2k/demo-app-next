import type { Metadata } from 'next';
import './app.css'
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { options } from './options';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}
export function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'vi' }];
}
export default async function AppLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
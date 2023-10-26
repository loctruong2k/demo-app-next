import { ToastProvider } from '@/src/components/toast/context'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: `Đăng nhập để sử dụng ứng dụng`,
    description: 'Bạn phải đăng nhập để sử dụng các dịnh vụ của ứng dụng.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            <ToastProvider>
                {children}
            </ToastProvider>
        </main>
    )
}

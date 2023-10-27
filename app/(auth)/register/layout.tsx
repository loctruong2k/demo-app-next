import type { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
    title: `Đăng ký tài khoản để sử dụng ứng dụng.`,
    description: 'Bạn phải ký tài khoản trước khi sử dụng các dịnh vụ của ứng dụng.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

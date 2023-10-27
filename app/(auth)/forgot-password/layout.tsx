import type { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
    title: `Bạn quên mật khẩu của mình.`,
    description: 'Bạn có thể lấy lại mật khẩu thông qua email đăng ký.',
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

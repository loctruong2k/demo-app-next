import { Fragment } from 'react'

export default function MessageItemLayout({
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

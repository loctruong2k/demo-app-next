import { Fragment } from 'react'

export default function MessageLayout({
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

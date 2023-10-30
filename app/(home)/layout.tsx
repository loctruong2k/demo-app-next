import AuthMenu from '@/src/components/auth-menu'
import HeaderPage from '@/src/components/header'
import type { Metadata } from 'next'
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
      <div className="flex flex-col relative">
        <HeaderPage />
        <AuthMenu />
        {children}
      </div>
    </Fragment>
  )
}

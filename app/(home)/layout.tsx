import HeaderPage from '@/src/components/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Fragment } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <Fragment>
      <div className="flex flex-col">
        <HeaderPage />
        {children}
      </div>
    </Fragment>
  )
}
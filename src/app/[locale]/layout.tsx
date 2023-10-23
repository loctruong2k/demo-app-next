import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}
export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: {
    locale: string
  }
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider></body>
    </html>
  )
}

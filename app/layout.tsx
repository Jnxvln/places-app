import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/lib/components/ui/Navbar/Navbar'
import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Places App',
  description: 'Testing out a few Google APIs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

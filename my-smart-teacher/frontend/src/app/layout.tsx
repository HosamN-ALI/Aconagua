import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import '../styles/globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700']
})

export const metadata: Metadata = {
  title: 'المعلم الذكي - معلم الرياضيات الذكي',
  description: 'منصة تعليمية ذكية لتعليم الرياضيات للمنهج السعودي',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>{children}</body>
    </html>
  )
}

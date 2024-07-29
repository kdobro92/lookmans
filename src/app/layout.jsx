import { Inter } from 'next/font/google'
import Script from 'next/script'
import Head from 'next/head'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '룩맨즈헤어',
  description: 'LOOKMANS hair project',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_KEY}&libraries=services,clusterer,drawing`}
          strategy="beforeInteractive"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import ThemeProvider from '@/components/Providers/ThemeProvider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

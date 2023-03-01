import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import '@/styles/global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider 
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light'
      }}
      >
      <Component {...pageProps} />
    </MantineProvider>
  )
}

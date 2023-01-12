import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
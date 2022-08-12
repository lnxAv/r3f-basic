import '../@styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { XGUI } from '../@components/x/x-gui/x-gui'
import { Canvas } from '@react-three/fiber'
import { Perf } from 'r3f-perf'
import { useGlobalStore } from '../@helpers/x-store'

function MyApp({ Component, pageProps }: AppProps) {
  const [data] = useGlobalStore((state) => [state.perfData])
  return (
    <>
      <Component {...pageProps} />
      <XGUI />
    </>
  )
}

export default appWithTranslation(MyApp)

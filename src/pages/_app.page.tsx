import '../@styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { XGUI } from '../@components/x/x-gui/component'
import { NextComponentType } from 'next'
import XCanvas from '../@components/x/x-canvas/component'
import { XPage } from './type'
import { useGlobalStore } from '../@helpers/x-store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

type XAppProps = AppProps & {
  Component: NextComponentType & XPage // add auth type
}

function MyApp({ Component, pageProps }: XAppProps) {
  const router = useRouter()
  const [setRouter] = useGlobalStore((state) => [state.setRouter])

  useEffect(() => {
    // Give access to router for r3f
    setRouter(router)
    console.log('router', router)
  }, [router])

  return (
    <>
      <XGUI />
      {!!!Component.r3f && <Component {...pageProps} />}
      {!!Component.r3f && (
        <XCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            width: '100vw',
            height: '100vh',
          }}
          html={{
            content: <Component {...pageProps} />,
            scrollControls: Component?.scrollControls,
          }}
        >
          {Component.r3f(pageProps)}
        </XCanvas>
      )}
    </>
  )
}

export default appWithTranslation(MyApp)

import '../@styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { XGUI } from '../@components/x/x-gui/component'
import { NextComponentType } from 'next'
import XCanvas from '../@components/x/x-canvas/component'
import { XPage } from './type'
import { ScrollControls } from '@react-three/drei'

type XAppProps = AppProps & {
  Component: NextComponentType & XPage // add auth type
}

function MyApp({ Component, pageProps }: XAppProps) {
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

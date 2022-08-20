import '../@styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { NextComponentType } from 'next'
import { XPage } from './x-page'
import { useGlobalStore } from '../@helpers/x-store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion as htmlMotion } from 'framer-motion'
import { motion as r3fMotion } from 'framer-motion-3d'
import globalVariants from '../@styles/motion.variants'
import { DynamicXCanvas } from '../@components/x/x-canvas/component'
import { XGUI } from '../@components/x/x-gui/component'
import Head from 'next/head'
import manifest from '../../manifest.json'

type XAppProps = AppProps & {
  Component: NextComponentType & XPage // add auth type
}

function MyApp({ Component, pageProps }: XAppProps) {
  const router = useRouter()
  const [setRouter] = useGlobalStore((state) => [state.setRouter])

  useEffect(() => {
    // Give access to router for r3f
    setRouter(router)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  useEffect(() => {
    // Turn's off the splash screen
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader')
      if (loader) loader.style.display = 'none'
    }
  }, [])

  return (
    <>
      <Head>
        {/* Dynamic headers */}
        <title>{pageProps.title || manifest.name}</title>
      </Head>
      <XGUI />
      {!!!Component.r3f ? ( // if doesn't contain r3f, render HTML only
        <htmlMotion.div
          key={router.pathname}
          {...(!!Component.htmlMotion
            ? { ...Component.htmlMotion }
            : { ...globalVariants.default })}
        >
          <Component {...pageProps} />
        </htmlMotion.div>
      ) : !!Component.r3f ? ( // if contain r3f, render canvas with injected HTML & R3F
        <DynamicXCanvas
          fullscreen
          html={{
            content: (
              <htmlMotion.div
                key={router.pathname}
                {...(!!Component.htmlMotion
                  ? { ...Component.htmlMotion }
                  : { ...globalVariants.default })}
              >
                <Component {...pageProps} />
              </htmlMotion.div>
            ),
            scrollControls: Component?.scrollControls,
          }}
        >
          <AnimatePresence exitBeforeEnter>
            <r3fMotion.group
              key={router.pathname}
              {...(!!Component.r3fMotion
                ? { ...Component.r3fMotion }
                : { ...globalVariants.defaultScene })}
            >
              {Component.r3f(pageProps)}
            </r3fMotion.group>
          </AnimatePresence>
        </DynamicXCanvas>
      ) : null}
    </>
  )
}

export default appWithTranslation(MyApp)

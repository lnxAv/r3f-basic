import '../@styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { XGUI } from '../@components/x/x-gui/component'
import { NextComponentType } from 'next'
import { XPage } from './x-page'
import { useGlobalStore } from '../@helpers/x-store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'
import { motion as r3fMotion } from 'framer-motion-3d'
import globalVariants from '../@styles/motion.variants'
import { DynamicXCanvas } from '../@components/x/x-canvas/component'

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

  return (
    <>
      <XGUI />
      <AnimatePresence exitBeforeEnter>
        {!!!Component.r3f ? ( // if doesn't contain r3f, render HTML only
          <motion.div
            key={router.pathname}
            {...(!!Component.htmlMotion
              ? { ...Component.htmlMotion }
              : { ...globalVariants.default })}
          >
            <Component {...pageProps} />
          </motion.div>
        ) : !!Component.r3f ? ( // if contain r3f, render canvas with injected HTML & R3F
          <DynamicXCanvas
            fullscreen
            html={{
              content: (
                <motion.div
                  key={router.pathname}
                  {...(!!Component.htmlMotion
                    ? { ...Component.htmlMotion }
                    : { ...globalVariants.default })}
                >
                  <Component {...pageProps} />
                </motion.div>
              ),
              scrollControls: Component?.scrollControls,
            }}
          >
            <AnimatePresence exitBeforeEnter>
              <r3fMotion.scene
                key={router.pathname}
                {...(!!Component.r3fMotion
                  ? { ...Component.r3fMotion }
                  : { ...globalVariants.defaultScene })}
              >
                {Component.r3f(pageProps)}
              </r3fMotion.scene>
            </AnimatePresence>
          </DynamicXCanvas>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default appWithTranslation(MyApp)

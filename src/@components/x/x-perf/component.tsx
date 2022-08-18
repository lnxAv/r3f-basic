import dynamic from 'next/dynamic'
import { PerfProps, usePerf } from 'r3f-perf'
import React, { useEffect, useRef, useState } from 'react'
import { useGlobalStore } from '../../../@helpers/x-store'
import { Props } from './types'

const Perf = dynamic<PerfProps>(() =>
  import('r3f-perf').then((module) => module.Perf)
)
const DynamicXPerfHook = dynamic<Props & PerfProps>(() =>
  import('./component').then((mod) => mod.XPerfHook)
)

export const XPerf: React.FC<Props & PerfProps> = ({
  id,
  ignoreDevMode = false,
  ...props
}) => {
  // Conditionally use r3f-Perf
  const [selectedCanvas, app] = useGlobalStore((state) => [
    state.selectedCanvas,
    state.app,
  ])
  const condition: boolean =
    !!selectedCanvas && selectedCanvas === id && (app.devMode || ignoreDevMode)

  return condition ? (
    <>
      <Perf
        position='top-left'
        minimal
        {...props}
        /* @ts-ignore */
        customData={{ value: 0, name: selectedCanvas, info: 'id' }}
      />
      <DynamicXPerfHook id={id} />
    </>
  ) : null
}

export const XPerfHook: React.FC<Props> = ({ id }) => {
  // Conditionally Grab r3f-Perf values and set's it in the Global Store
  const [isReady, setIsReady] = useState<boolean>(true)
  const _PERF = usePerf()
  const intervalRef = useRef<number>()
  const [setPerfData, selectedCanvas] = useGlobalStore((state) => [
    state.setPerfData,
    state.selectedCanvas,
  ])

  const condition: boolean = !!selectedCanvas && selectedCanvas === id

  const startUpdate = () => {
    setIsReady(false)
    const intervalId = window.setTimeout(() => {
      setPerfData(_PERF)
      setIsReady(true)
    }, 300)
    intervalRef.current = intervalId
  }

  const stopUpdate = () => {
    window.clearTimeout(intervalRef.current)
    setPerfData(undefined)
  }

  useEffect(() => {
    if (condition && isReady) {
      startUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_PERF])

  useEffect(() => {
    return () => {
      stopUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition])

  return null
}

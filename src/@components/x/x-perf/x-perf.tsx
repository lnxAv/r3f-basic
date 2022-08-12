import { Perf, PerfProps, usePerf } from 'r3f-perf'
import React, { useEffect, useRef, useState } from 'react'
import { setInterval } from 'timers'
import { useGlobalStore } from '../../../@helpers/x-store'

interface XPerfProps {
  id: string
}

export interface XPerfStoreSlice {
  perfData?: ReturnType<typeof usePerf>
  setPerfData: (perfData?: ReturnType<typeof usePerf>) => void
}

export const XPerfHook: React.FC<XPerfProps> = ({ id }) => {
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

export const XPerf: React.FC<XPerfProps & PerfProps> = ({ id, ...props }) => {
  // Conditionally inject r3f-Perf
  const [selectedCanvas, app] = useGlobalStore((state) => [
    state.selectedCanvas,
    state.app,
  ])
  const condition: boolean =
    !!selectedCanvas && selectedCanvas === id && app.devMode

  return condition ? (
    <>
      <Perf
        position='top-left'
        minimal
        {...props}
        /* @ts-ignore */
        customData={{ value: 0, name: selectedCanvas, info: 'id' }}
      />
      <XPerfHook id={id} />
    </>
  ) : null
}

import { Perf, PerfProps, usePerf } from 'r3f-perf'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { setInterval } from 'timers'
import { useGlobalStore } from '../../@helpers/store'

interface XPerfProps {
  id: string
}

export interface XPerfStoreSlice {
  perfData?: ReturnType<typeof usePerf>
  setPerfData: (perfData?: ReturnType<typeof usePerf>) => void
}

export const XPerfHook: React.FC<XPerfProps> = ({ id }) => {
  // Conditionally Grab r3f-Perf values and set's it in the Global Store
  const intervalRef = useRef<number>()
  const [setPerfData, selectedCanvas] = useGlobalStore((state) => [
    state.setPerfData,
    state.selectedCanvas,
  ])
  const _PERF = usePerf()

  const condition: boolean = !!selectedCanvas && selectedCanvas === id

  const startUpdate = () => {
    const intervalId = window.setInterval(() => {
      setPerfData(_PERF)
    }, 1000)
    intervalRef.current = intervalId
  }

  const stopUpdate = () => {
    window.clearInterval(intervalRef.current)
    setPerfData(undefined)
  }

  useEffect(() => {
    if (condition) {
      startUpdate()
    }
    return () => {
      stopUpdate()
    }
  }, [selectedCanvas])

  return null 
}

export const XPerf: React.FC<XPerfProps & PerfProps> = ({ id, ...props }) => {
  // Conditionally inject r3f-Perf
  const [selectedCanvas, app] = useGlobalStore((state) => [state.selectedCanvas, state.app])
  const condition: boolean = !!selectedCanvas && (selectedCanvas === id) && app.devMode

  return condition ? (
    <>
      <Perf position='top-left' minimal {...props} />
      <XPerfHook id={id} />
    </>
  ) : null
}

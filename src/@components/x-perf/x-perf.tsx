import { Perf, PerfProps, usePerf } from 'r3f-perf';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { setInterval } from 'timers';
import useGlobalStore from '../../../helpers/store';

interface XPerfProps{
    id: string
}

export interface XPerfStoreSlice{
    perfData: ReturnType<typeof usePerf> | null
    setPerfData: (perfData: ReturnType<typeof usePerf> | null) => void
}

export const XPerfHook: React.FC<XPerfProps> = ({id}) => {
    // Grab Perf values and set's it in the store (if id matches selected canvas)
    const intervalRef = useRef<number>()
    const [setPerfData, selectedCanvas] = useGlobalStore((state) => [state.setPerfData, state.selectedCanvas])
    const _PERF = usePerf();

    const startUpdate = ()=> {
        setPerfData(_PERF)
    }

    const stopUpdate =()=> {
        window.clearInterval( intervalRef.current)
        setPerfData(null)
    }

    useEffect(()=>{
        const intervalId = window.setInterval(startUpdate, 1000)
        intervalRef.current = intervalId
        return () => {stopUpdate()}
    }, [selectedCanvas])

    return null;
};


export const XPerf: React.FC<XPerfProps & PerfProps> = ({id, ...props}) => {
    // Conditionally shows XPerf
    const [selectedCanvas] = useGlobalStore((state) => [state.selectedCanvas])

    return (selectedCanvas === id?
        <>
            <Perf {...props} />
            <XPerfHook id={id} />
        </>
    : null)
}


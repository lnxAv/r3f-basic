import React, { useEffect, useRef, useState } from 'react'
import { LevaPanel, useControls, useCreateStore } from 'leva'
import { StoreType } from 'leva/dist/declarations/src/types'
import _ from 'lodash'
import { useGlobalStore } from '../../../@helpers/x-store'

// @refresh reset

export interface XGUIStoreSlice {
  guiStore?: StoreType | null
  setGUIStore: (guiStore: StoreType | null | undefined) => void
}

// Renders gui store asigned -
export function XGUI() {
  const [guiStore] = useGlobalStore((state) => [state.guiStore])
  return (
    <LevaPanel
      neverHide
      store={guiStore}
      titleBar={{ title: 'store : ' + guiStore?.storeId }}
    />
  )
}

// Create a gui store to be assigned -
function useGUIControlsDevelopment(initialProps?: any): [StoreType, any] {
  const [store] = useState(useCreateStore()) // new store for the given props
  const guiStore = useRef(useGlobalStore.getState().guiStore)
  useEffect(
    () =>
      useGlobalStore.subscribe((state) => (guiStore.current = state.guiStore)),
    []
  )
  // From: https://codesandbox.io/s/ny3p4?file=/src/App.js
  // User: drcmda
  // Hacky workaround to trick Leva into being able to handle mutiple stores ...
  const materialProps = useControls(
    Object.keys(initialProps).reduce(
      (acc, key) => ({
        ...acc,
        [key]: {
          ...initialProps[key],
          transient: false,
        },
      }),
      {}
    ),
    { store },
    [guiStore.current]
  )
  return [store, materialProps as typeof initialProps]
}

function useGUIControlsProduction(initialProps: any): [null, any] {
  const getPureProps = () => {
    return Object.keys(initialProps).reduce(
      (acc, key) => ({
        ...acc,
        [key]: initialProps[key].value,
      }),
      {}
    )
  }
  const [pureProps] = useState(getPureProps() || {})

  return [null, pureProps]
}

export function useGUIControls(
  initialProps?: any,
  ignoreDevMode?: boolean
): [StoreType | null, any] {
  const [app] = useGlobalStore((state) => [state.app])
  // For the sake of performace, switching ignoreDevMode will give errors & require to re-mount
  /* eslint-disable */
  if (app.devMode || ignoreDevMode) {
    try {
      return useGUIControlsDevelopment(initialProps)
    } catch (error) {
      console.warn('== Force refresh == ' + error)
      return [null, {}]
    }
  } else {
    try {
      return useGUIControlsProduction(initialProps)
    } catch (error) {
      console.warn('== Force refresh == ', error)
      return [null, {}]
    }
  }
  /* eslint-enable */
}

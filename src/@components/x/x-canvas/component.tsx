import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { uniqueId } from 'lodash'
import { useGlobalStore } from '../../../@helpers/x-store'
import { XCanvasProps } from './types'
import XCanvasWrapper, { fullScreenStyle } from './styled'
import dynamic from 'next/dynamic'
import { DynamicScrollableHtml } from './scrollableHtml/component'
import { XPerf } from '../x-perf/component'
import { Preload } from '@react-three/drei'

export const DynamicXCanvas = dynamic<XCanvasProps & CanvasProps>(
  () => import('../../../@components/x/x-canvas/component'),
  { ssr: true, suspense: true }
)

// Offer a special canvas injected with features
export const XCanvas: React.FC<XCanvasProps & CanvasProps> = ({
  html,
  children,
  style,
  color,
  fullscreen,
  ...props
}) => {
  const [canvas_id, setCanvasId] = useState<string>('')
  const [app, selectedCanvas, setSelectedCanvas] = useGlobalStore((state) => [
    state.app,
    state.selectedCanvas,
    state.setSelectedCanvas,
  ])

  useEffect(() => {
    setCanvasId(uniqueId('canvas-'))
  }, [])

  const handleSelection = () => {
    // TODO : pass canvas ref instead ??
    setSelectedCanvas(canvas_id !== selectedCanvas ? canvas_id : '')
  }
  const memoScroll = useMemo(
    () => (html ? <DynamicScrollableHtml {...html} /> : null),
    [html]
  )

  return (
    <XCanvasWrapper
      style={fullscreen ? fullScreenStyle : style}
      devMode={app.devMode}
    >
      <button id={'canvas-toggle'} onClick={handleSelection}>
        {canvas_id ? canvas_id : ''}
      </button>
      <Canvas {...props}>
        <Preload />
        <Suspense>
          {color ? <color attach='background' args={[color]} /> : null}
          {app.devMode ? <XPerf id={canvas_id} /> : null}
          <group>{children}</group>
          {memoScroll}
        </Suspense>
      </Canvas>
    </XCanvasWrapper>
  )
}

export default XCanvas

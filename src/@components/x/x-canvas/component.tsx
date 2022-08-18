import React, { useEffect, useState } from 'react'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { uniqueId } from 'lodash'
import { useGlobalStore } from '../../../@helpers/x-store'
import { XCanvasProps } from './types'
import XCanvasWrapper, { fullScreenStyle } from './styled'
import dynamic from 'next/dynamic'
import { DynamicScrollableHtml } from './scrollableHtml/component'
import { XPerf } from '../x-perf/component'

export const DynamicXCanvas = dynamic<XCanvasProps & CanvasProps>(() =>
  import('./component').then((mod) => mod.XCanvas)
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

  return (
    <XCanvasWrapper
      style={fullscreen ? fullScreenStyle : style}
      devMode={app.devMode}
    >
      <button id={'canvas-toggle'} onClick={handleSelection}>
        {canvas_id ? canvas_id : ''}
      </button>
      <Canvas {...props}>
        {color ? <color attach='background' args={[color]} /> : null}
        <XPerf id={canvas_id} />
        <group>{children}</group>
        {html ? <DynamicScrollableHtml {...html} /> : null}
      </Canvas>
    </XCanvasWrapper>
  )
}

export default XCanvas

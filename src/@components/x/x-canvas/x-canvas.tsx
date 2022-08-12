import React, { useEffect, useState } from 'react'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { XPerf } from '../x-perf/x-perf'
import { uniqueId } from 'lodash'
import styled from 'styled-components'
import { useGlobalStore } from '../../../@helpers/x-store'

interface Props {
  children: React.ReactNode
}

const XCanvasWrapper = styled.div<{ devMode: boolean }>`
  position: relative;
  button#canvas-toggle {
    position: absolute;
    display: none;
  }
  ${(props) =>
    props.devMode
      ? `
    border: 1px solid #181c20;
    background: #181c20;
    color: #8c92a4;
    font-size: 12px;
    font-family: monospace;
    button#canvas-toggle {
      display: inline;
      z-index: 999;
      background: #181c20;
      padding: 1px 5px;
      border-bottom-right-radius: 5px;
    }
  `
      : ''}
`

// Offer a special canvas injected with features
export const XCanvas: React.FC<Props & CanvasProps> = (props) => {
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
    setSelectedCanvas(canvas_id !== selectedCanvas ? canvas_id : '')
  }

  return (
    <XCanvasWrapper devMode={app.devMode}>
      <button id={'canvas-toggle'} onClick={handleSelection}>
        {canvas_id ? canvas_id : ''}
      </button>
      <Canvas>
        <XPerf id={canvas_id} />
        {props.children}
      </Canvas>
    </XCanvasWrapper>
  )
}

export default XCanvas

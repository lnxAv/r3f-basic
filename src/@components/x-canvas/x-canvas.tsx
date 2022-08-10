import React, { useState } from 'react'
import { Canvas, Props as CanvasProps } from '@react-three/fiber'
import { XPerf } from '../x-perf/x-perf'
import { uniqueId } from 'lodash'
import styled from 'styled-components'
import { useGlobalStore } from '../../../helpers/store'

interface Props {
  children: React.ReactNode
}

const XCanvasWrapper = styled.div`
  position: relative;
  border: 1px solid red;
  button#canvas-toggle {
    position: absolute;
    z-index: 999;
    background: red;
  }
`

// Offer a special canvas injected with features
export const XCanvas: React.FC<Props & CanvasProps> = (props) => {
  const [canvas_id] = useState<string>(uniqueId('canvas-'))
  const [selectedCanvas, setSelectedCanvas] = useGlobalStore((state) => [
    state.selectedCanvas,
    state.setSelectedCanvas,
  ])

  const handleSelection = () => {
    setSelectedCanvas(canvas_id !== selectedCanvas ? canvas_id : '')
  }

  return (
    <XCanvasWrapper>
      <button id={'canvas-toggle'} onClick={handleSelection}>
        x-perf
      </button>
      <Canvas>
        <XPerf id={canvas_id} />
        {props.children}
      </Canvas>
    </XCanvasWrapper>
  )
}

export default XCanvas

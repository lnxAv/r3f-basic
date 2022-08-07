import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { XPerf } from '../x-perf/x-perf'
import { uniqueId } from 'lodash'
import styled from 'styled-components'
import useGlobalStore from '../../../helpers/store'

interface Props {
  children: React.ReactNode
}

const XCanvasWrapper = styled.div`
  border: 1px solid red;
  button#canvas-toggle {
    background: red;
  }
`

// Offer a special canvas injected with features
export const XCanvas: React.FC<Props> = (props) => {
  const [canvas_id] = useState<string>(uniqueId('canvas-'))
  const [selectedCanvas, setSelectedCanvas] = useGlobalStore((state) => [
    state.selectedCanvas,
    state.setSelectedCanvas,
  ])

  const handleSelection = () => {
    setSelectedCanvas(canvas_id !== selectedCanvas ? canvas_id : '')
  }

  return (
    <XCanvasWrapper onClick={handleSelection}>
      <Canvas>
        <XPerf id={canvas_id} />
        {props.children}
      </Canvas>
    </XCanvasWrapper>
  )
}

export default XCanvas

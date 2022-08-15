import { ScrollControlsProps } from '@react-three/drei'
import { CSSProperties, MutableRefObject } from 'react'

type XCanvasProps = {
  children: React.ReactNode
  html?: {
    content: JSX.Element | NextComponentType
    scrollControls?: Partial<ScrollControlsProps>
    ref?: MutableRefObject<any>
  }
  style?: CSSProperties
}

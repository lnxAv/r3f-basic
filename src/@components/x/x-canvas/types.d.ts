import { ScrollControlsProps } from '@react-three/drei'
import { CSSProperties, MutableRefObject } from 'react'

type XCanvasProps = {
  children: React.ReactNode
  html?: XCanvasScrollableHTML
  style?: CSSProperties
}

type XCanvasScrollableHTML = {
  content: JSX.Element | NextComponentType
  scrollControls?: Partial<ScrollControlsProps>
  ref?: MutableRefObject<any>
}

import { ScrollControlsProps } from '@react-three/drei'
// Page extension for the r3f background on a page
import { ThreeElements } from '@react-three/fiber'
import { NextComponentType, NextPage } from 'next'
import { PropsWithChildren, ReactElement, Ref } from 'react'
type XPage<P = {}, IP = P> = NextComponentType<P, IP> & {
  r3f?: (props: P) => JSX.Element
  scrollControls?: Partial<ScrollControlsProps>
}

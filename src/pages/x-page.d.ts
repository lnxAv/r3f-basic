import { MotionProps } from 'framer-motion'
import { MotionProps } from 'framer-motion'
import { ScrollControlsProps } from '@react-three/drei'
// Page extension for the r3f background on a page
import { ThreeElements } from '@react-three/fiber'
import { NextComponentType, NextPage } from 'next'
import { PropsWithChildren, ReactElement, Ref } from 'react'
type XPage<P = {}, IP = P> = NextComponentType<P, IP> & {
  title?: string
  r3f?: (props: P) => JSX.Element
  r3fMotion?: MotionProps
  htmlMotion?: MotionProps
  scrollControls?: Partial<ScrollControlsProps>
}

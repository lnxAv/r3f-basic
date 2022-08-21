import { ScrollControlsProps } from '@react-three/drei'
import { MotionProps, MotionProps } from 'framer-motion'
import { NextComponentType } from 'next'
import { ComponentType, PropsWithChildren, ReactElement, Ref } from 'react'

// Page extension for the r3f background on a page
type XPage<P = {}, IP = P> = NextComponentType<P, IP> & {
  title?: string
  r3f?: ComponentType<P> & {
    motion?: MotionProps
    scrollControls?: Partial<ScrollControlsProps>
  }
  htmlMotion?: MotionProps
}

type XR3f<P = {}> = ComponentType<P> & {
  motion?: MotionProps
  scrollControls?: Partial<ScrollControlsProps>
}

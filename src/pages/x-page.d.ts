import { MotionProps } from 'framer-motion'
import { MotionProps } from 'framer-motion'
import { ScrollControlsProps } from '@react-three/drei'
// Page extension for the r3f background on a page
import { ThreeElements } from '@react-three/fiber'
import { NextComponentType, NextPage } from 'next'
import { ComponentType, PropsWithChildren, ReactElement, Ref } from 'react'

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

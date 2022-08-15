import React from 'react'
import { useThree } from '@react-three/fiber'
import { Scroll, ScrollControls } from '@react-three/drei'
import Image from 'next/image'
import { useGlobalStore } from '../../../../@helpers/x-store'
import { XCanvasScrollableHTML } from '../types'

// Offer a special canvas injected with features
export const ScrollableHtml = ({
  scrollControls,
  content,
}: XCanvasScrollableHTML) => {
  const [router] = useGlobalStore((state) => [state.router])
  const { size } = useThree()

  return (
    <mesh>
      <ScrollControls key={router?.pathname} {...scrollControls}>
        <Scroll html>
          <div
            className='xcanvas-scroll-wrapper'
            style={{
              height: size.height,
              width: size.width,
            }}
          >
            <div
              style={{
                minHeight: '100vh',
                maxHeight: '100vh',
                padding: '20px',
                overflow: 'auto',
              }}
            >
              {content}
            </div>
          </div>
        </Scroll>
      </ScrollControls>
    </mesh>
  )
}
export default ScrollableHtml

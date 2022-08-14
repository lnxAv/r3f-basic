import { RhombicDodecaedronLines } from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { XPage } from '../type'
import styled from 'styled-components'
import { XHtml } from '../../@components/x/x-html/component'
import {
  Html,
  Line,
  OrbitControls,
  PresentationControls,
  useScroll,
} from '@react-three/drei'
import { useEffect } from 'react'
import Link from 'next/link'

const Div = styled.div`
  padding-top: 50px;
  width: 50vw;
  height: 100vh;
`

const Test: XPage = (props) => {
  const test = useScroll()

  useEffect(() => {
    console.log(test)
  }, [test])

  return (
    <>
      <Div>
        <Link href={'/test'}>Im the best link</Link>
      </Div>
      <Div>
        <p>Im the second hottest div</p>
      </Div>
    </>
  )
}

Test.scrollControls = {
  pages: 2,
  damping: 3,
}

Test.r3f = (props) => {
  return (
    <>
      <OrbitControls />
      <RhombicDodecaedronLines lineWidth={3} />
      <Html> test </Html>
    </>
  )
}
export default Test

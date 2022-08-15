import {
  RhombicDodecaedron,
  RhombicDodecaedronLines,
} from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { XPage } from '../type'
import styled from 'styled-components'
import { Html, OrbitControls, useScroll } from '@react-three/drei'
import { useEffect } from 'react'
import Link from 'next/link'
import { useGlobalStore } from '../../@helpers/x-store'

const Div = styled.div`
  padding-top: 50px;
  width: 50vw;
  height: 100vh;
`

const Test2: XPage = (props) => {
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

Test2.scrollControls = {
  pages: 2,
  damping: 3,
}

const R3f3 = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])
  return (
    <>
      <OrbitControls enableZoom={false} />
      <RhombicDodecaedron />
      <Html occlude position={[-1, -1, 0]}>
        {' '}
        <div
          onClick={(e) => router?.push('/test', undefined, { shallow: true })}
        >
          test
        </div>{' '}
      </Html>
    </>
  )
}

Test2.r3f = (props) => {
  return (
    <>
      <R3f3 {...props}></R3f3>
    </>
  )
}

export default Test2

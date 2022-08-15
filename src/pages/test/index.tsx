import { RhombicDodecaedronLines } from '../../@components/x/x-shapes/rhombic_dodecahedron'
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

const Test: XPage = (props) => {
  return (
    <>
      <Div>
        <Link href={'/test2'}>EVIIILLLL</Link>
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

const R3f = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])
  const test = useScroll()

  useEffect(() => {
    console.log(test)
  }, [test])
  return (
    <>
      <OrbitControls enableZoom={false} />
      <RhombicDodecaedronLines lineWidth={3} />
      <Html occlude position={[-1, -1, 0]}>
        {' '}
        <div
          onClick={(e) => router?.push('/test2', undefined, { shallow: true })}
        >
          test2
        </div>{' '}
      </Html>
    </>
  )
}

Test.r3f = (props) => {
  return (
    <>
      <R3f {...props}></R3f>
    </>
  )
}

export default Test

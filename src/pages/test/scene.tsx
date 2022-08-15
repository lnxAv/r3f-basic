import { Html, OrbitControls } from '@react-three/drei'
import { RhombicDodecaedronLines } from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { useGlobalStore } from '../../@helpers/x-store'

const R3f = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])

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

export default R3f

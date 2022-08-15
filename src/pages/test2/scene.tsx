import { Html, OrbitControls } from '@react-three/drei'
import { RhombicDodecaedron } from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { useGlobalStore } from '../../@helpers/x-store'

const R3f = (props: any) => {
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

export default R3f

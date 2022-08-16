import { Html, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { FlatShading, Group } from 'three'
import {
  RhombicDodecaedron,
  RhombicDodecaedronLines,
} from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { GroupReffered } from '../../@helpers/types'
import { useGlobalStore } from '../../@helpers/x-store'

const R3f = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])
  const groupRef = useRef<GroupReffered>(null)

  useFrame((time, delta) => {
    if (groupRef.current) {
      groupRef.current.center
      groupRef.current.rotation.y = groupRef.current.rotation.y += 1 * delta
    }
  })

  return (
    <>
      <ambientLight />
      <group ref={groupRef} position={[0, 0, 0]}>
        <RhombicDodecaedronLines
          scale={0.5}
          lineWidth={3}
          position={[0, 0, 2.5]}
        />
        <RhombicDodecaedron scale={1} position={[2.5, 0, 2.5]}>
          <meshPhysicalMaterial
            color='#E3DAC9'
            transmission={1}
            thickness={1}
            envMapIntensity={0}
            roughness={0}
          />
        </RhombicDodecaedron>
        <RhombicDodecaedron scale={1} position={[2.5, 0, 0]}>
          <meshPhysicalMaterial
            color='#e8c89f'
            transmission={0}
            envMapIntensity={0.2}
            roughness={0}
          />
        </RhombicDodecaedron>
      </group>
    </>
  )
}

export default R3f

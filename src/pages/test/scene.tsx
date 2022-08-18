import { OrthographicCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import {
  RhombicDodecaedron,
  RhombicDodecaedronLines,
} from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { GroupReffered } from '../../@helpers/types'
import { useGlobalStore } from '../../@helpers/x-store'

const GlitchShader = dynamic(
  () => import('../../@styles/shader/glitch/Shader'),
  {
    ssr: false,
  }
)

const R3f = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])
  const groupRef = useRef<GroupReffered>(null)

  useFrame((time, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = groupRef.current.rotation.y += -0.6 * delta
    }
  })

  return (
    <>
      <ambientLight />
      <group ref={groupRef} position={[0, 0, 0]}>
        <RhombicDodecaedron scale={1} position={[0, -2.5, -2.5]}>
          <meshPhysicalMaterial
            color='#E3DAC9'
            transmission={1}
            thickness={0}
            envMapIntensity={0}
            roughness={0}
          />
        </RhombicDodecaedron>
        <RhombicDodecaedronLines
          color='#d92357'
          scale={0.5}
          lineWidth={3}
          position={[-2, 0, 2]}
        />
        <RhombicDodecaedron scale={1} position={[-2, -2.5, 2]}>
          <meshPhysicalMaterial
            color='#f0b57d3a'
            transmission={1}
            thickness={0}
            envMapIntensity={0}
            roughness={0}
          />
        </RhombicDodecaedron>
        <RhombicDodecaedron scale={1} position={[2.5, 0, 2]}>
          <meshPhysicalMaterial
            color='#c31563'
            transmission={0.9}
            envMapIntensity={0.5}
            metalness={0.4}
          />
        </RhombicDodecaedron>
        <RhombicDodecaedron scale={1} position={[2.5, -2.5, 2]}>
          <meshPhysicalMaterial
            color='#E3DAC9'
            transmission={1}
            thickness={0}
            envMapIntensity={0}
            roughness={0}
          />
        </RhombicDodecaedron>
        <GlitchShader />
      </group>
    </>
  )
}

export default R3f

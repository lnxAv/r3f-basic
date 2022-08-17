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
      groupRef.current.rotation.y = groupRef.current.rotation.y += 1 * delta
    }
  })

  return (
    <>
      <OrthographicCamera>
        <ambientLight />
        <group ref={groupRef} position={[0, 0, 0]}>
          <RhombicDodecaedron scale={1} position={[0, 0, -2.5]}>
            <meshPhysicalMaterial
              color='#E3DAC9'
              transmission={0.5}
              thickness={0}
              envMapIntensity={0}
              roughness={0}
            />
          </RhombicDodecaedron>
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
            scale={0.5}
            lineWidth={3}
            position={[0, 0, 2.5]}
          />
          <RhombicDodecaedron scale={1} position={[0, -2.5, 2.5]}>
            <meshPhysicalMaterial
              color='#f0b57d'
              transmission={1}
              thickness={0}
              envMapIntensity={0}
              roughness={0}
            />
          </RhombicDodecaedron>
          <RhombicDodecaedron scale={1} position={[2.5, 0, 0]}>
            <meshPhysicalMaterial
              color='#cdee5f'
              transmission={0}
              envMapIntensity={0.2}
              roughness={0}
            />
          </RhombicDodecaedron>
          <RhombicDodecaedron scale={1} position={[2.5, -2.5, 0]}>
            <meshPhysicalMaterial
              color='#E3DAC9'
              transmission={1}
              thickness={0}
              envMapIntensity={0}
              roughness={0}
            />
          </RhombicDodecaedron>
          <RhombicDodecaedron scale={1} position={[-2.5, 0, 0]}>
            <meshPhysicalMaterial
              color='#e8c89f'
              transmission={0}
              envMapIntensity={0.2}
              roughness={0}
            />
          </RhombicDodecaedron>
          <RhombicDodecaedron scale={1} position={[-2.5, -2.5, 0]}>
            <meshPhysicalMaterial
              color='#E3DAC9'
              transmission={1}
              thickness={0}
              envMapIntensity={0}
              roughness={0}
            />
          </RhombicDodecaedron>
          <GlitchShader />
          <RhombicDodecaedron scale={1} position={[0, -2.5, 0]}>
            <meshPhysicalMaterial
              color='#E3DAC9'
              transmission={1}
              thickness={0}
              envMapIntensity={0}
              roughness={0}
            />
          </RhombicDodecaedron>
        </group>
      </OrthographicCamera>
    </>
  )
}

export default R3f

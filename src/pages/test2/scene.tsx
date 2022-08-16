import { Html, OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Triangle } from 'three'
import { MeshReffered } from '../../@helpers/types'
import { useGlobalStore } from '../../@helpers/x-store'

const R3f = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])
  const mesh = useRef<MeshReffered>(null)
  useFrame((t, d) => {
    if (mesh.current) {
      mesh.current.rotation.x += mesh.current.rotation.y + 2 * d
    }
  })
  return (
    <>
      <mesh ref={mesh}>
        <tetrahedronBufferGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  )
}

export default R3f

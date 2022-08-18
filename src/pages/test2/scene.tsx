import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MeshReffered } from '../../@helpers/types'

const R3f = (props: any) => {
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

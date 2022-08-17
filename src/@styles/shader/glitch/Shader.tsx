import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import fake_uv from '../../../../public/three/glitchalpha.png'
import vertex from './glsl/glitch.vert'
import fragment from './glsl/glitch.frag'
import { Vector2 } from 'three'

const GlitchMaterial = shaderMaterial(
  {
    iTime: 0,
  },
  vertex,
  fragment
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
GlitchMaterial.key = THREE.MathUtils.generateUUID()

extend({ GlitchMaterial })

const GlitchShader = ({ children, ...props }: any) => {
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)

  return (
    <mesh
      ref={meshRef}
      scale={hovered ? 1.1 : 1}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      position={[0, 0, 0]}
      {...props}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      {/* @ts-ignore */}
      <glitchMaterial key={GlitchMaterial.key} />
    </mesh>
  )
}

export default GlitchShader

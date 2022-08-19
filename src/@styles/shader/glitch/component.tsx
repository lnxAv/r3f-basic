import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { memo, useEffect, useRef, useState } from 'react'
import { shaderMaterial, useTexture } from '@react-three/drei'
import fake_uv from '../../../../public/three/glitchalpha.png'
import vertex from './glsl/glitch.vert'
import fragment from './glsl/glitch.frag'
import { Vector3, Vector4 } from 'three'
import { RhombicDodecaedron } from '../../../@components/x/x-shapes/rhombic_dodecahedron'
import dynamic from 'next/dynamic'

const GlitchMaterial = shaderMaterial(
  {
    u_glitchalpha_texture: null,
    u_time: 0,
    u_color: new Vector4(0, 1, 0, 1),
    u_hue_color: new Vector3(0.5, 0, 0),
    u_light_dir: new Vector3(0, -5, 0),
    u_light_color: new Vector4(0, 0, 0, 0),
  },
  vertex,
  fragment
)

// This is the 🔑 that HMR will renew if this file is edited
// It works for THREE.ShaderMaterial as well as for drei/shaderMaterial
// @ts-ignore
GlitchMaterial.key = THREE.MathUtils.generateUUID()

extend({ GlitchMaterial })

const GlitchShader = memo(
  function GlitchShader({ children, ...props }: any) {
    const meshRef = useRef(null)
    const glitchTexture = useTexture(fake_uv.src)
    useFrame((time) => {
      if (meshRef?.current) {
        //@ts-ignore
        meshRef.current.material.uniforms.u_time.value =
          Math.sin(time.clock.elapsedTime / 1.5) * 5
      }
    })
    useEffect(() => {
      props
    }, [props])
    return (
      <RhombicDodecaedron ref={meshRef} detail={0} {...props}>
        {/*@ts-ignore*/}
        <glitchMaterial
          key={GlitchMaterial.key}
          blending={THREE.AdditiveBlending}
          uniforms={{
            u_glitchalpha_texture: { value: glitchTexture },
            u_time: { value: 0 },
            u_hue_color: { value: new Vector3(1, 0.0, 0.7) },
          }}
        />
      </RhombicDodecaedron>
    )
  },
  (prevProps, nextProps) => true
)

export default GlitchShader
export const DynamicGlitchShader = dynamic<any>(() =>
  import('./component').then((mod) => mod.default)
)

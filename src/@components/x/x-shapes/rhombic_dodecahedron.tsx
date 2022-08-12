import { MeshProps } from '@react-three/fiber'
import { forwardRef, Ref } from 'react'
import { MeshReffered } from '../../../@helpers/x-types'

export const args = {
  vertices: [
    [1, 1, 1], // 0
    [1, 1, -1], // 1
    [1, -1, 1], // 2
    [1, -1, -1], // 3
    [-1, 1, 1], // 4
    [-1, 1, -1], // 5
    [-1, -1, 1], // 6
    [-1, -1, -1], // 7
    [2, 0, 0], // 8
    [-2, 0, 0], // 9
    [0, 2, 0], // 10
    [0, -2, 0], // 11
    [0, 0, 2], // 12
    [0, 0, -2], // 13
  ].flat(),
  indices: [
    // Top
    12, 2, 0, 8, 0, 2, 12, 6, 2, 11, 2, 6, 12, 4, 6, 9, 6, 4, 12, 0, 4, 10, 4,
    0,
    // Sides
    11, 3, 2, 8, 2, 3, 8, 1, 0, 10, 0, 1, 10, 5, 4, 9, 4, 5, 9, 7, 6, 11, 6, 7,
    // Bottom
    13, 3, 7, 11, 7, 3, 13, 1, 3, 8, 3, 1, 13, 5, 1, 10, 1, 5, 13, 7, 5, 9, 5,
    7,
  ],
  radius: 1,
  detail: 0,
}

type ShapeType = { radius?: number; detail?: number }

export const RhombicDodecaedron = forwardRef(function RhombicDodecaedron(
  {
    radius = args.radius,
    detail = args.detail,
    ...props
  }: MeshProps & ShapeType,
  ref: Ref<MeshReffered>
) {
  return (
    <mesh ref={ref} {...props}>
      <polyhedronBufferGeometry
        args={[args.vertices, args.indices, radius, detail]}
      />
      {props.children}
    </mesh>
  )
})

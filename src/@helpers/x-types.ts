import { Mesh, BufferGeometry, Material } from 'three'
import { Ref } from 'react'

export type MeshReffered = Mesh<BufferGeometry, Material | Material[]>

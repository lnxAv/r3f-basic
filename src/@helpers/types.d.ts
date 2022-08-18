// Global store
import { XPerfStoreSlice } from '../@components/x/x-perf/types'
import { XGUIStoreSlice } from '../@components/x/x-gui/types'
import { NextRouter } from 'next/router'
interface GlobalStore extends XAppStoreSlice, XPerfStoreSlice, XGUIStoreSlice {
  selectedCanvas: string
  setSelectedCanvas: (id: string) => void
}
type XAppStoreSlice = {
  app: {
    // special variables
    devMode: boolean
    // special actions
  }
  router: NextRouter | null
  setRouter: (router: NextRouter) => void
}

// Ref for Meshes since not declared by @r3f
import { Mesh, BufferGeometry, Material } from 'three'
export type MeshReffered = Mesh<BufferGeometry, Material | Material[]>
export type GroupReffered = Group<BufferGeometry, Material | Material[]>

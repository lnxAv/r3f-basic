import { XGUIStoreSlice } from './../src/@components/x-gui/x-gui';
import { XPerfStoreSlice } from '../src/@components/x-perf/x-perf'
import create from 'zustand'

interface GlobalStore extends XPerfStoreSlice, XGUIStoreSlice {
  selectedCanvas: string
  setSelectedCanvas: (id: string) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  /* x-canvas tracked */
  selectedCanvas: '',
  /* x-perf data */
  perfData: null,
  /* gui-store data */
  guiStore: null,
  // Setters & Dispatch
  setPerfData: (perfData) => set({ perfData }),
  setSelectedCanvas: (selectedCanvas) => set({ selectedCanvas }),
  setGUIStore: (guiStore) => set({guiStore})
}))

export const { getState: getGlobalState, setState: setGlobalState } = useGlobalStore
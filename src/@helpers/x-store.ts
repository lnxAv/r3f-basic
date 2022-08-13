import create from 'zustand'
import { GlobalStore } from './types'

export const useGlobalStore = create<GlobalStore>((set) => ({
  /* APP */
  app: {
    // devMode - for optimization, will require re-mount on certain features (just refresh the page)
    devMode: process.env.NODE_ENV === 'development' ? true : false,
  },
  /* x-canvas tracked */
  selectedCanvas: '',
  /* x-perf data */
  perfData: undefined,
  /* x-gui-store data */
  guiStore: null,
  // Setters & Dispatch
  setPerfData: (perfData) => set({ perfData }),
  setSelectedCanvas: (selectedCanvas) => set({ selectedCanvas }),
  setGUIStore: (guiStore) => set({ guiStore }),
}))

export const { getState: getGlobalState, setState: setGlobalState } =
  useGlobalStore

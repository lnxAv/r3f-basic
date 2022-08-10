import { XGUIStoreSlice } from '../@components/x-gui/x-gui'
import { XPerfStoreSlice } from '../@components/x-perf/x-perf'
import create from 'zustand'

type XAppStoreSlice = {
    app: {
      // @special variables
      devMode: boolean;
      // @special actions
    }
}

interface GlobalStore extends  XAppStoreSlice, XPerfStoreSlice, XGUIStoreSlice{
  selectedCanvas: string
  setSelectedCanvas: (id: string) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  /* APP */
  app:{
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

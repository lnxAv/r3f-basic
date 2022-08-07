import { XPerfStoreSlice } from '../src/@components/x-perf/x-perf';
import create from 'zustand'

interface GlobalStore extends XPerfStoreSlice {
  selectedCanvas: string;
  setSelectedCanvas: (id: string) => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  value: '',
  selectedCanvas: '',
  perfData: null,
  setPerfData: (perfData) => set({perfData}),
  setSelectedCanvas: (selectedCanvas) => set({selectedCanvas})
}))

export const { getState: getGlobalState, setState: setGlobalState } = useGlobalStore
export default useGlobalStore

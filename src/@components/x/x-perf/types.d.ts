type Props = {
  id: string
  ignoreDevMode?: boolean
}

import { usePerf } from 'r3f-perf'
export type XPerfStoreSlice = {
  perfData?: ReturnType<typeof usePerf>
  setPerfData: (perfData?: ReturnType<typeof usePerf>) => void
}

import { RhombicDodecaedronLines } from '../../@components/x/x-shapes/rhombic_dodecahedron'
import { OrbitControls } from '@react-three/drei'
import { XPage } from '../type'

const test: XPage = (props) => {
  return (
    <>
      <div style={{ padding: '50px', color: 'white', zIndex: 1 }}>Overlay</div>
    </>
  )
}

test.r3f = (props) => {
  return (
    <>
      <OrbitControls />
      <RhombicDodecaedronLines lineWidth={5} />
    </>
  )
}
export default test

import { XPage } from '../type'
import styled from 'styled-components'
import Link from 'next/link'
import R3f from './scene'

const Div = styled.div`
  padding-top: 50px;
  width: 50vw;
  height: 100vh;
`

const Test2: XPage = (props) => {
  return (
    <>
      <Div>
        <Link href={'/test'}>Im the best link</Link>
      </Div>
      <Div>
        <p>Im the second hottest div</p>
      </Div>
    </>
  )
}

Test2.scrollControls = {
  pages: 2,
  damping: 3,
}

Test2.r3f = (props) => {
  return (
    <>
      <R3f {...props}></R3f>
    </>
  )
}

export default Test2

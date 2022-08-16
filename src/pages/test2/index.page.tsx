import { XPage } from '../type'
import styled from 'styled-components'
import Link from 'next/link'
import R3f from './scene'

const Div = styled.div`
  border: 1px solid red;
  padding-top: 50px;
  width: auto;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
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

Test2.r3f = (props) => {
  return (
    <>
      <R3f {...props}></R3f>
    </>
  )
}

Test2.htmlMotion = {
  initial: {
    opacity: 0,
    y: -5,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -5,
  },
}

Test2.r3fMotion = {
  initial: {
    y: -5,
    x: 0,
    scale: 0,
  },
  animate: {
    y: 0,
    x: 0,
    scale: 1,
  },
  exit: {
    x: 5,
    scale: 0,
  },
}

Test2.scrollControls = {
  pages: 0,
}

export default Test2

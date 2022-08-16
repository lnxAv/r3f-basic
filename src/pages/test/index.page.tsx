import { XPage } from '../type'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import Link from 'next/link'
import R3f from './scene'

const Div = styled.div`
  padding-top: 50px;
  width: 50vw;
  height: 100vh;
  border: 1px solid red;
`

const Test: XPage = (props) => {
  return (
    <>
      <Div>
        <Link href={'/test2'}>EVIIILLLL</Link>
      </Div>
      <Div>
        <p>Im the second hottest div</p>
      </Div>
    </>
  )
}

Test.r3f = (props) => {
  return (
    <>
      <R3f {...props}></R3f>
    </>
  )
}

Test.htmlMotion = {
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

Test.r3fMotion = {
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

Test.scrollControls = {
  pages: 2,
  damping: 8,
}

export default Test

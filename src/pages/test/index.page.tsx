import { XPage } from '../x-page'
import useSWR from 'swr'
import styled from 'styled-components'
import R3f from './scene'
import { useGlobalStore } from '../../@helpers/x-store'
import { motion } from 'framer-motion'
import globalVariants from '../../@styles/motion.variants'
import { XGUI } from '../../@components/x/x-gui/component'

const Div = styled(motion.div)`
  padding: 25px;
  padding-top: 50px;
  width: 50vw;
  height: 100vh;
  overflow: auto;
  scroll-snap-type: y mandatory;
  @media only screen and (max-width: 600px) {
    width: 100vw;
  }
`

const Test: XPage = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])
  // render data
  return (
    <>
      <Div {...globalVariants.default}>
        <h1>Rhombic Dodecahedron</h1>
        {props.data?.map((content: any, i: number) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: content }} />
        ))}
        <br />
        +
        <br />
        +
        <br />+
        <motion.div style={{ position: 'absolute', bottom: 0 }}>
          <br />
          +
          <br />
          +
          <br />
          +
          <br />
          +
          <br />v
        </motion.div>
      </Div>
      <Div>
        <br />
        ^
        <br />
        +
        <br />+
        <div>
          Etiam ultricies lorem vel nisi luctus posuere. Phasellus ac tincidunt
          purus, non vehicula turpis.
        </div>
        <div>
          <a
            href='/test2'
            style={{ color: 'white' }}
            onClick={(e) => {
              e.preventDefault()
              router?.push('/test2')
            }}
          >
            {`< test2 />`}
          </a>
          <br />
        </div>
      </Div>
    </>
  )
}

export async function getStaticProps() {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Tetrahedron'
  const res = await fetch(url)
  const posts = await res.json()
  const extractAPIContents = (json: any) => {
    const { pages } = json.query

    return Object.keys(pages).map((id) => pages[id].extract)
  }

  return {
    props: {
      data: extractAPIContents(posts),
    },
  }
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
    y: 0,
    x: -5,
    scale: 0,
  },
  animate: {
    y: 0,
    x: 0,
    scale: 1,
  },
  exit: {
    x: 5,
    y: 1,
    scale: 0,
  },
}

Test.scrollControls = {
  pages: 2,
  damping: 4,
}

export default Test

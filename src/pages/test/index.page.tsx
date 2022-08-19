import { XPage } from '../x-page'
import useSWR from 'swr'
import styled from 'styled-components'
import R3f from './scene'
import { useGlobalStore } from '../../@helpers/x-store'
import { motion } from 'framer-motion'
import globalVariants from '../../@styles/motion.variants'

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

const useFetchShapeWiki = () => {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Rhombic_dodecahedron'
  const fetcher = (...args: any) =>
    fetch(args)
      .then((res) => res.json())
      .then((json) => extractAPIContents(json))
  const { data, error } = useSWR(url, fetcher)

  const extractAPIContents = (json: any) => {
    const { pages } = json.query
    return Object.keys(pages).map((id) => pages[id].extract)
  }

  return {
    data: data,
    isLoading: !error && !data,
    error: error,
  }
}

const Test: XPage = (props) => {
  const [router] = useGlobalStore((state) => [state.router])
  const { data } = useFetchShapeWiki()
  // render data
  return (
    <>
      <Div {...globalVariants.default}>
        <h1>Rhombic Dodecahedron</h1>
        {data?.map((content, i) => (
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
          <a
            href='/home'
            style={{ color: 'white' }}
            onClick={(e) => {
              e.preventDefault()
              router?.push('/home')
            }}
          >
            {`< home />`}
          </a>
        </div>
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

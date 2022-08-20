import { XPage } from '../x-page'
import styled from 'styled-components'
import R3f from './scene'
import { motion } from 'framer-motion'
import { useGlobalStore } from '../../@helpers/x-store'
import globalVariants from '../../@styles/motion.variants'

const Div = styled.div`
  padding: 25px;
  padding-top: 50px;
  width: 50vw;
  height: auto;
  overflow: auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const Test2: XPage = (props: any) => {
  const [router] = useGlobalStore((state) => [state.router])

  return (
    <>
      <Div>
        <h1>Tetrahedron</h1>

        {props.data?.map((content: any, i: number) => (
          <motion.div
            {...globalVariants.magicText}
            key={i}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ))}
      </Div>
      <Div>
        <div>
          Etiam ultricies lorem vel nisi luctus posuere. Phasellus ac tincidunt
          purus, non vehicula turpis.
        </div>
        <div>
          <a
            href='/test'
            style={{ color: 'white' }}
            onClick={(e) => {
              e.preventDefault()
              router?.push('/test')
            }}
          >
            {`< test />`}
          </a>
          <br />
        </div>
      </Div>
    </>
  )
}

export async function getServerSideProps() {
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
    y: -1,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.5,
  },
  exit: {
    opacity: 0,
    y: -5,
  },
}

Test2.r3fMotion = {
  initial: {
    x: -5,
    y: -1,
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

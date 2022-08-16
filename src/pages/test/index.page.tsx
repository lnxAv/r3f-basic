import { XPage } from '../type'
import useSWR from 'swr'
import styled from 'styled-components'
import Link from 'next/link'
import R3f from './scene'
import { useGlobalStore } from '../../@helpers/x-store'

const Div = styled.div`
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
      <Div>
        <h1>Rhombic Dodecahedron</h1>
        {data?.map((content, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: content }} />
        ))}
      </Div>
      <Div>
        <div>
          Etiam ultricies lorem vel nisi luctus posuere. Phasellus ac tincidunt
          purus, non vehicula turpis.
        </div>
        <div>
          <a
            href=''
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
            href=''
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
  damping: 4,
}

export default Test
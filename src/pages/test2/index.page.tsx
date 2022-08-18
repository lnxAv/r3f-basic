import { XPage } from '../x-page'
import styled from 'styled-components'
import R3f from './scene'
import useSWR from 'swr'
import { useGlobalStore } from '../../@helpers/x-store'

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

const useFetchShapeWiki = () => {
  const url =
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Tetrahedron'
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

const Test2: XPage = (props) => {
  const [router] = useGlobalStore((state) => [state.router])
  const { data } = useFetchShapeWiki()

  return (
    <>
      <Div>
        <h1>Tetrahedron</h1>
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

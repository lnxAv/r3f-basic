import { XPage } from '../x-page'
import useSWR from 'swr'
import styled from 'styled-components'
import R3f from './r3f'
import { useGlobalStore } from '../../@helpers/x-store'
import { motion } from 'framer-motion'
import globalVariants from '../../@styles/motion.variants'
import { XGUI } from '../../@components/x/x-gui/component'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

const Div = styled(motion.div)`
  position: relative;
  padding: 25px;
  padding-top: 50px;
  width: 50vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  @media only screen and (max-width: 620px) {
    width: 100vw;
  }
`

const Test: XPage = (props: any) => {
  const { i18n } = useTranslation()
  const [router] = useGlobalStore((state) => [state.router])
  // render data
  return (
    <>
      <Head>
        <title>Rhombic Dodecahedron</title>
      </Head>
      <Div {...globalVariants.default}>
        <h1>{props.title}</h1>
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
          <a
            href={`${props.locale}/test`}
            onClick={(e) => {
              e.preventDefault()
              router?.push('/test', '/test', {
                locale: props.locale === 'en' ? 'fr' : 'en',
              })
            }}
          >
            {`< ${props.locale === 'en' ? 'fr' : 'en'} />`}
          </a>
          <br />
        </div>
      </Div>
    </>
  )
}

export async function getStaticProps({ locale }: any) {
  const title =
    locale === 'en' ? 'Rhombic_dodecahedron' : 'Dodécaèdre_rhombique'
  const url = `https://${locale}.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=${title}`

  const res = await fetch(url)
  const posts = await res.json()
  const extractAPIContents = (json: any) => {
    const { pages } = json.query

    return Object.keys(pages).map((id) => pages[id].extract)
  }

  return {
    props: {
      locale,
      title: title,
      data: extractAPIContents(posts),
    },
  }
}

Test.r3f = R3f

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

export default Test

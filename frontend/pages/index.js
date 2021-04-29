import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import HeroPrimary from '../components/partials/HeroPrimary'
import styled from 'styled-components'

const Wrapper = styled.div`
    text-align: center;
    height: 100%;
`

export default function Home() {
  return (
    <Layout pageTitle={"The SQL"}>
      <Wrapper>
          <HeroPrimary />
      </Wrapper>
    </Layout>
  )
}

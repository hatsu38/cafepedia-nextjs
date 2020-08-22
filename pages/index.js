import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { Container } from "react-bootstrap"

// Component
import Layout from '../components/layout'
import About from '../components/about'
import Prefectures from '../components/prefectures'
import ChainShops from '../components/chainShops'
import PopularStations from '../components/popularStations'

// Style
import '../stylesheets/index.module.scss'


function Index({prefectures, popularChainShops, popularStations}) {
  return (
    <Layout>
      <Head>
        <title>カフェペディア</title>
      </Head>
      <div className="position-relative">
        <div className="bg-image__item" style={{backgroundImage: "url(/images/bg-header.jpg)"}}></div>
        <Container className="mt-4">
          <About />
          <Prefectures prefectures={prefectures} />
        </Container>
        <Container>
          <ChainShops chainShops={popularChainShops} />
          <PopularStations stations={popularStations} />
        </Container>
      </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps({ params }) {
  const prefRes = await fetch(`${process.env.apiHost}prefectures`)
  const prefJson = await prefRes.json()
  const popularChainShopsRes = await fetch(`${process.env.apiHost}popular/main_shops`)
  const popularChainShopsJson = await popularChainShopsRes.json()
  const popularStationsRes = await fetch(`${process.env.apiHost}popular/stations`)
  const popularStationsJson = await popularStationsRes.json()

  const prefectures = prefJson.prefectures
  const popularChainShops = popularChainShopsJson.main_shops
  const popularStations = popularStationsJson.stations

  return { props: { prefectures, popularChainShops, popularStations } }
}
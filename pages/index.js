import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { Container } from "react-bootstrap"

// Component
import Layout from '../components/layout'
import About from '../components/about'
import Prefectures from '../components/prefectures'
import PopularStations from '../components/popularStations'

// Style
import '../stylesheets/index.module.scss'


function Index({prefectures, popularStations}) {
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
          <PopularStations stations={popularStations} />
        </Container>
      </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps({ params }) {
  const prefRes = await fetch(`https://cafepedia-api.herokuapp.com/api/prefectures`)
  const prefJson = await prefRes.json()
  const popularStationsRes = await fetch(`https://cafepedia-api.herokuapp.com/api/popular_stations`)
  const popularStationsJson = await popularStationsRes.json()

  const prefectures = prefJson.prefectures
  const popularStations = popularStationsJson.stations

  return { props: { prefectures, popularStations } }
}
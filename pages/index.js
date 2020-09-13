import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import fetch from "isomorphic-unfetch"
import { Container } from "react-bootstrap"

// Component
import Layout from "components/layout"
import Search from "components/search"
import Prefectures from "components/prefectures"
import ChainShops from "components/chainShops"
import PopularStations from "components/popularStations"

// Style
import "../stylesheets/index.module.scss"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
  popularChainShops: PropTypes.array.isRequired,
  popularStations: PropTypes.array.isRequired,
}

export default function Index({
  prefectures,
  popularChainShops,
  popularStations,
}) {
  return (
    <Layout>
      <Head>
        <title>カフェペディア</title>
      </Head>
      <div className="position-relative">
        <div
          className="bg-image__item"
          style={{ backgroundImage: "url(/images/bg-header.jpg)" }}
        />
        <Container className="mt-4">
          <div className="pt-4">
            <Search />
          </div>
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

Index.propTypes = propTypes

export async function getStaticProps() {
  const prefs = await import("lib/datas/prefectures.json")
  const popularChainShopsRes = await fetch(
    `${process.env.apiHost}popular/main_shops`
  )
  const popularChainShopsJson = await popularChainShopsRes.json()
  const popularStationsRes = await fetch(
    `${process.env.apiHost}popular/stations`
  )
  const popularStationsJson = await popularStationsRes.json()

  const prefectures = prefs.datas
  const popularChainShops = popularChainShopsJson.main_shops
  const popularStations = popularStationsJson.stations

  return { props: { prefectures, popularChainShops, popularStations } }
}

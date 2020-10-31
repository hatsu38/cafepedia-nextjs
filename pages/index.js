import React from "react"
import PropTypes from "prop-types"
import fetch from "isomorphic-unfetch"
import { Container } from "react-bootstrap"

// Component
import Layout from "components/layout"
import Search from "components/search"
import Prefectures from "components/prefectures"
import ChainShops from "components/chainShops"
import PopularStations from "components/popularStations"
import PopularCities from "components/popularCities"

// Style
import "../stylesheets/index.module.scss"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
  popularChainShops: PropTypes.array.isRequired,
  popularStations: PropTypes.array.isRequired,
  popularCities: PropTypes.array.isRequired,
}

export default function Index({
  prefectures,
  popularChainShops,
  popularStations,
  popularCities,
}) {
  return (
    <Layout>
      <div className="position-relative">
        <div
          className="bg-image__item"
          style={{ backgroundImage: "url(/images/bg-header.webp)" }}
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
          <PopularCities cities={popularCities} />
        </Container>
      </div>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getStaticProps() {
  const prefecturesJson = await import("lib/datas/prefectures.json")
  const popularChainShopsRes = await fetch(
    `${process.env.apiHost}popular/main_shops`
  )
  const popularChainShopsJson = await popularChainShopsRes.json()
  const popularStationsRes = await fetch(
    `${process.env.apiHost}popular/stations`
  )
  const popularStationsJson = await popularStationsRes.json()

  const popularCitiesRes = await fetch(`${process.env.apiHost}popular/cities`)
  const popularCitiesJson = await popularCitiesRes.json()

  const prefectures = prefecturesJson.datas
  const popularChainShops = popularChainShopsJson.main_shops
  const popularStations = popularStationsJson.stations
  const popularCities = popularCitiesJson.cities

  return {
    props: {
      prefectures: prefectures,
      popularChainShops: popularChainShops,
      popularStations: popularStations,
      popularCities: popularCities,
    },
  }
}

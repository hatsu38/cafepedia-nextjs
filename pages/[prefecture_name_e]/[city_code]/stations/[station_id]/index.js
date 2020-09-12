import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import Cities from "components/sidebars/cities"
import Stations from "components/sidebars/stations"
import ChainShops from "components/sidebars/chainShops"
import SidebarWithShopLists from "components/sidebarWithShopLists"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  stations: PropTypes.array,
  station: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
  chainShops: PropTypes.array.isRequired,
}

export default function Index({
  prefecture,
  city,
  stations,
  station,
  cities,
  shops,
  chainShops,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const title = `${prefecture.name}${city.name}${station.kanji_name}の電源のあるカフェ${shops.length}選`
  const sidebar = (
    <React.Fragment>
      {stations.length ? (
        <Stations stations={stations} />
      ) : (
        <Cities cities={cities.slice(0, 12)} prefecture={prefecture} />
      )}
      {chainShops.length && (
        <ChainShops
          chainShops={chainShops.slice(0, 8)}
          prefecture={prefecture}
          city={city}
        />
      )}
    </React.Fragment>
  )
  return (
    <Layout>
      <Head>
        <title>カフェペディア | {title}</title>
      </Head>
      <Container>
        <SidebarWithShopLists sidebar={sidebar} shops={shops} title={title} />
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.apiHost}prefectures/tokyo/cities/13101/`
  )
  const json = await res.json()
  const prefecture = json.prefecture
  const city = json.city
  const stations = json.stations

  const paths = stations.map((station) => ({
    params: {
      prefecture_name_e: prefecture.name_e,
      city_code: city.code,
      station_id: station.id.toString(),
    },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities/${params.city_code}/stations/${params.station_id}`
  )
  const json = await response.json()

  const prefecture = json.prefecture
  const city = json.city
  const stations = json.stations
  const station = json.station
  const cities = json.cities
  const shops = json.shops
  const chainShops = json.main_shops

  return {
    props: { prefecture, city, stations, station, cities, shops, chainShops },
  }
}

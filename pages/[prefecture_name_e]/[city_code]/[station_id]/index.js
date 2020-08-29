import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import ShopLists from "components/shopLists"
import Cities from "components/sidebars/cities"
import Stations from "components/sidebars/stations"

import "stylesheets/prefecture_name_e.module.scss"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  stations: PropTypes.array,
  station: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
}

export default function Index({
  prefecture,
  city,
  stations,
  station,
  cities,
  shops,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>
          カフェペディア | {prefecture.name}
          {city.name}
          {station.kanji_name}の電源のあるカフェ{shops.length}選
        </title>
      </Head>
      <Container className="d-flex">
        <div className="sidebars-left">
          {stations.length ? (
            <Stations stations={stations} />
          ) : (
            <Cities cities={cities.slice(0, 12)} prefecture={prefecture} />
          )}
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">
            {station.kanji_name}の電源のあるカフェ{shops.length}選
          </h1>
          <ShopLists shops={shops} />
        </div>
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

  return { props: { prefecture, city, stations, station, cities, shops } }
}

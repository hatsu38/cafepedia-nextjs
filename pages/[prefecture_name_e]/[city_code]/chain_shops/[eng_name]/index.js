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
  prefecture: PropTypes.object,
  city: PropTypes.object,
  stations: PropTypes.array,
  chainShop: PropTypes.object,
  cities: PropTypes.array,
  shops: PropTypes.array,
}

export default function Index({
  prefecture,
  city,
  stations,
  chainShop,
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
          {chainShop.name}の電源のあるカフェ{shops.length}選
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
            {prefecture.name}
            {city.name}
            {chainShop.name}の電源のあるカフェ{shops.length}選
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
  const chainShops = json.main_shops

  const paths = chainShops.map((chainShop) => ({
    params: {
      prefecture_name_e: prefecture.name_e,
      city_code: city.code,
      eng_name: chainShop.eng_name,
    },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities/${params.city_code}/main_shops/${params.eng_name}`
  )
  const json = await response.json()

  const prefecture = json.prefecture
  const city = json.city
  const stations = json.stations
  const chainShop = json.main_shop
  const cities = json.cities
  const shops = json.shops

  return {
    props: { prefecture, city, stations, chainShop, cities, shops },
  }
}

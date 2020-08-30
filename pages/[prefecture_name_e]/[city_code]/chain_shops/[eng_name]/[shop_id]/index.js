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

import "stylesheets/sidebars/sidebars.module.scss"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  stations: PropTypes.array,
  station: PropTypes.object,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
  shop: PropTypes.object.isRequired,
}

export default function Index({
  prefecture,
  stations,
  station,
  cities,
  shops,
  shop,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <Head>
        <title>カフェペディア | {shop.name}</title>
      </Head>
      <Container className="d-flex">
        <div className="sidebars-left">
          {stations.length && (
            <Stations stations={stations} station={station} />
          )}
          <Cities cities={cities.slice(0, 12)} prefecture={prefecture} />
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">{shop.name}</h1>
          <ShopLists shops={shops} />
        </div>
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.apiHost}prefectures/tokyo/cities/13101/main_shops/starbacks`
  )
  const json = await res.json()
  const prefecture = json.prefecture
  const city = json.city
  const chainShop = json.main_shop
  const shops = json.shops

  const paths = shops.map((shop) => ({
    params: {
      prefecture_name_e: prefecture.name_e,
      city_code: city.code,
      eng_name: chainShop.eng_name,
      shop_id: shop.id.toString(),
    },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities/${params.city_code}/main_shops/${params.eng_name}/shops/${params.shop_id}`
  )
  const json = await response.json()

  const prefecture = json.prefecture
  const stations = json.stations
  const station = json.station
  const cities = json.cities
  const shops = json.shops
  const shop = json.shop

  return {
    props: {
      prefecture,
      stations,
      station,
      cities,
      shops,
      shop,
    },
  }
}

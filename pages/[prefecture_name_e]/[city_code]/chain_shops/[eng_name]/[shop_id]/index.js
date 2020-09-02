import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import ShopLists from "components/shopLists"
import TopInfoLists from "./components/topInfoLists"
import ShopDetailInfo from "./components/shopDetailInfo"
import GoogleMap from "./components/googleMap"

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

export default function Index({ shops, shop, station }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <Layout>
      <Head>
        <title>カフェペディア | {shop.name}</title>
      </Head>
      <Container className="mt-n2">
        <span className="chain-shop-name original-gray-text f8">
          {shop.main_shop.name}
        </span>
        <h1 className="f4 font-bold">{shop.name}</h1>
        <TopInfoLists shop={shop} station={station} />
        <GoogleMap shop={shop} />
        <ShopDetailInfo shop={shop} />
        <ShopLists shops={shops} />
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

  const shops = json.shops
  const shop = json.shop
  const station = json.station

  return { props: { shops, shop, station } }
}

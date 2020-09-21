import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container, Row, Col } from "react-bootstrap"

import Layout from "components/layout"
import ShopLists from "components/shopLists"
import TopInfoLists from "components/topInfoLists"
import ShopDetailInfo from "components/shopDetailInfo"
import GoogleMap from "components/googleMap"

import "stylesheets/sidebars/sidebars.module.scss"

const propTypes = {
  shops: PropTypes.array.isRequired,
  shop: PropTypes.object.isRequired,
  station: PropTypes.object,
}

export default function Index({ shops, shop, station }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Layout>
        <Head>
          <title>カフェペディア</title>
        </Head>
        <Container className="mt-n2">
          <span className="chain-shop-name original-gray-text f8"> </span>
          <h1 className="f4 font-bold"> </h1>
          <div className="mt-5">
            <h2 className="f5 font-bold">近くの電源のあるカフェ選</h2>
          </div>
        </Container>
      </Layout>
    )
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
        <Row>
          <Col sm={12} md={8} className="my-1">
            <TopInfoLists shop={shop} station={station} />
            <ShopDetailInfo shop={shop} />
          </Col>
          <Col sm={12} md={4} className="my-1">
            <GoogleMap shop={shop} />
          </Col>
        </Row>
        <div className="mt-5">
          <h2 className="f5 font-bold">
            近くの電源のあるカフェ{shops.length}選
          </h2>
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
  const shops = json.shops

  const paths = shops.map((shop) => ({
    params: {
      prefecture_name_e: shop.prefecture_name_e,
      city_code: shop.city_code,
      eng_name: shop.main_shop.eng_name,
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

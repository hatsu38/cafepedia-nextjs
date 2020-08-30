import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import ShopLists from "components/shopLists"
import Prefectures from "components/sidebars/prefectures"
import Stations from "components/sidebars/stations"

import "stylesheets/sidebars/sidebars.module.scss"

const propTypes = {
  prefectures: PropTypes.object,
  stations: PropTypes.array,
  chainShop: PropTypes.object,
  shops: PropTypes.array,
}

export default function Index({ prefectures, stations, chainShop, shops }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>
          カフェペディア |{chainShop.name}の電源のあるカフェ{shops.length}選
        </title>
      </Head>
      <Container className="d-flex">
        <div className="sidebars-left">
          <Stations stations={stations} />
          <Prefectures prefectures={prefectures} chainShop={chainShop} />
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">
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
  const res = await fetch(`${process.env.apiHost}main_shops`)
  const json = await res.json()
  const chainShops = json.main_shops

  const paths = chainShops.map((chainShop) => ({
    params: {
      eng_name: chainShop.eng_name,
    },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.apiHost}/main_shops/${params.eng_name}`
  )
  const json = await response.json()

  const prefectures = json.prefectures
  const stations = json.stations
  const chainShop = json.main_shop
  const shops = json.shops

  return {
    props: { prefectures, stations, chainShop, shops },
  }
}

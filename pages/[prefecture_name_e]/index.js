import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import ShopLists from "components/shopLists"
import Cities from "components/sidebars/cities"
import ChainShops from "components/sidebars/chainShops"

import "stylesheets/prefecture_name_e.module.scss"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
  chainShops: PropTypes.array.isRequired,
}

export default function Index({ prefecture, cities, shops, chainShops }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>
          カフェペディア | {prefecture.name}の電源のあるカフェ{shops.length}選
        </title>
      </Head>
      <Container className="d-flex">
        <div className="sidebars-left">
          <Cities cities={cities.slice(0, 12)} prefecture={prefecture} />
          {chainShops.length && (
            <ChainShops chainShops={chainShops} prefecture={prefecture} />
          )}
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">
            {prefecture.name}の電源のあるカフェ{shops.length}選
          </h1>
          <ShopLists shops={shops} />
        </div>
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getStaticPaths() {
  const res = await fetch(`${process.env.apiHost}prefectures/`)
  const json = await res.json()
  const prefectures = json.prefectures

  const paths = prefectures.map((prefecture) => ({
    params: { prefecture_name_e: prefecture.name_e },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}`
  )
  const json = await response.json()

  const prefecture = json.prefecture
  const cities = json.cities
  const shops = json.shops
  const chainShops = json.main_shops

  return { props: { prefecture, cities, shops, chainShops } }
}

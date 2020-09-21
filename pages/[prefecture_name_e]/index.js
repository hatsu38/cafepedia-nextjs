import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import SidebarWithShopLists from "components/sidebarWithShopLists"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
  chainShops: PropTypes.array.isRequired,
}

export default function Index({ prefecture, cities, shops, chainShops }) {
  const title = `${prefecture.name}の電源のあるカフェ${shops.length}選`
  return (
    <Layout>
      <Head>
        <title>カフェペディア | {title}</title>
      </Head>
      <Container>
        <SidebarWithShopLists
          chainShops={chainShops}
          cities={cities}
          prefecture={prefecture}
          shops={shops}
          title={title}
        />
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

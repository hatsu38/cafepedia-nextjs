import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"

import SidebarWithShopLists from "components/sidebarWithShopLists"

const propTypes = {
  prefecture: PropTypes.object,
  stations: PropTypes.array,
  chainShop: PropTypes.object,
  cities: PropTypes.array,
  shops: PropTypes.array,
}

export default function Index({
  prefecture,
  stations,
  chainShop,
  cities,
  shops,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const title = `${prefecture.name}${chainShop.name}の電源のあるカフェ${shops.length}選`
  return (
    <Layout>
      <Head>
        <title>カフェペディア | {title}</title>
      </Head>
      <Container>
        <SidebarWithShopLists
          stations={stations}
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

export async function getServerSideProps({ params }) {
  const response = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}/main_shops/${params.eng_name}`
  )
  const json = await response.json()

  const prefecture = json.prefecture
  const stations = json.stations
  const chainShop = json.main_shop
  const cities = json.cities
  const shops = json.shops

  return {
    props: { prefecture, stations, chainShop, cities, shops },
  }
}

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.apiHost}prefectures/tokyo/`)
//   const json = await res.json()
//   const prefecture = json.prefecture
//   const chainShops = json.main_shops

//   const paths = chainShops.map((chainShop) => ({
//     params: {
//       prefecture_name_e: prefecture.name_e,
//       eng_name: chainShop.eng_name,
//     },
//   }))

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const response = await fetch(
//     `${process.env.apiHost}prefectures/${params.prefecture_name_e}/main_shops/${params.eng_name}`
//   )
//   const json = await response.json()

//   const prefecture = json.prefecture
//   const stations = json.stations
//   const chainShop = json.main_shop
//   const cities = json.cities
//   const shops = json.shops

//   return {
//     props: { prefecture, stations, chainShop, cities, shops },
//   }
// }

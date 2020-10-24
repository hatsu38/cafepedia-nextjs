import React from "react"
import PropTypes from "prop-types"
import NotFoundError from "components/NotFoundError"
import { NextSeo } from "next-seo"
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
  shopsTotalCount: PropTypes.number.isRequired,
  fetchUrl: PropTypes.string.isRequired,
}

export default function Index({
  prefecture,
  stations,
  chainShop,
  cities,
  shops,
  shopsTotalCount,
  fetchUrl,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (!chainShop || !prefecture) {
    return <NotFoundError />
  }

  const titlePrefix = "カフェペディア | "
  const titleBase = `${prefecture.name}${chainShop.name}の電源やWi-Fiのあるカフェ一覧`
  const title = titlePrefix + titleBase
  const description = `${titleBase}です。 ${process.env.baseDescription}`
  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          title: title,
          description: description,
        }}
      />
      <Container>
        <SidebarWithShopLists
          stations={stations}
          cities={cities}
          prefecture={prefecture}
          shops={shops}
          fetchUrl={fetchUrl}
          shopsTotalCount={shopsTotalCount}
          title={titleBase}
        />
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getServerSideProps({ params }) {
  const fetchUrl = `${process.env.apiHost}prefectures/${params.prefecture_name_e}/main_shops/${params.eng_name}`
  const response = await fetch(fetchUrl)
  const json = await response.json()

  const prefecture = json.prefecture
  const stations = json.stations
  const chainShop = json.main_shop
  const cities = json.cities
  const shops = json.shops
  const shopsTotalCount = json.shops_total_count

  return {
    props: {
      prefecture: prefecture,
      stations: stations,
      chainShop: chainShop,
      cities: cities,
      shops: shops,
      fetchUrl: fetchUrl,
      shopsTotalCount: shopsTotalCount,
    },
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

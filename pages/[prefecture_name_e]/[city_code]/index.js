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
  prefecture: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  stations: PropTypes.array,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
  chainShops: PropTypes.array.isRequired,
  shopsTotalCount: PropTypes.number.isRequired,
  fetchUrl: PropTypes.string.isRequired,
}

export default function Index({
  prefecture,
  city,
  stations,
  cities,
  shops,
  chainShops,
  shopsTotalCount,
  fetchUrl,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (!city || !prefecture) {
    return <NotFoundError />
  }
  const titlePrefix = "カフェペディア | "
  const titleBase = `${prefecture.name}${city.name}の電源やWi-Fiのあるカフェ一覧`
  const title = titlePrefix + titleBase
  const description = `${titleBase}です。 ${process.env.baseDescription}`
  const isNoIndex = shops.length > 1 ? false : true
  const isNoFollow = isNoIndex

  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        noindex={isNoIndex}
        nofollow={isNoFollow}
        openGraph={{
          title: title,
          description: description,
        }}
      />
      <Container>
        <SidebarWithShopLists
          chainShops={chainShops}
          stations={stations}
          cities={cities}
          city={city}
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
  const fetchUrl = `${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities/${params.city_code}`
  const response = await fetch(fetchUrl)
  const json = await response.json()

  const prefecture = json.prefecture
  const city = json.city
  const stations = json.stations
  const cities = json.cities
  const shops = json.shops
  const chainShops = json.main_shops
  const shopsTotalCount = json.shops_total_count

  return {
    props: {
      prefecture: prefecture,
      city: city,
      stations: stations,
      cities: cities,
      shops: shops,
      chainShops: chainShops,
      fetchUrl: fetchUrl,
      shopsTotalCount: shopsTotalCount,
    },
  }
}

// export async function getStaticPaths() {
//   // TODO: 動的に都道府県の市区町村ページの取得ができなかったのでtokyoを指定している
//   const res = await fetch(`${process.env.apiHost}prefectures/tokyo/cities`)
//   const json = await res.json()
//   const cities = json.cities
//   const prefecture = json.prefecture

//   const paths = cities.map((city) => ({
//     params: {
//       prefecture_name_e: prefecture.name_e,
//       city_code: city.code,
//     },
//   }))

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const response = await fetch(
//     `${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities/${params.city_code}`
//   )
//   const json = await response.json()

//   const prefecture = json.prefecture
//   const city = json.city
//   const stations = json.stations
//   const cities = json.cities
//   const shops = json.shops
//   const chainShops = json.main_shops

//   return { props: { prefecture, city, stations, cities, shops, chainShops } }
// }

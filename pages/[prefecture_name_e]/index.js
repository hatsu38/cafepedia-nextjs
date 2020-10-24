import React from "react"
import PropTypes from "prop-types"
import NotFoundError from "components/NotFoundError"
import { useRouter } from "next/router"
import { NextSeo } from "next-seo"
import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import SidebarWithShopLists from "components/sidebarWithShopLists"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  cities: PropTypes.array.isRequired,
  shops: PropTypes.array.isRequired,
  chainShops: PropTypes.array.isRequired,
  shopsTotalCount: PropTypes.number.isRequired,
  fetchUrl: PropTypes.string.isRequired,
}

export default function Index({
  prefecture,
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
  if (!prefecture) {
    return <NotFoundError />
  }

  const titlePrefix = "カフェペディア | "
  const titleBase = `${prefecture.name}の電源のあるカフェ一覧`
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
          chainShops={chainShops}
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
  const fetchUrl = `${process.env.apiHost}prefectures/${params.prefecture_name_e}`
  const response = await fetch(fetchUrl)
  const json = await response.json()

  const prefecture = json.prefecture
  const cities = json.cities
  const shops = json.shops
  const chainShops = json.main_shops
  const shopsTotalCount = json.shops_total_count

  return {
    props: {
      prefecture: prefecture,
      cities: cities,
      shops: shops,
      chainShops: chainShops,
      fetchUrl: fetchUrl,
      shopsTotalCount: shopsTotalCount,
    },
  }
}

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.apiHost}prefectures/`)
//   const json = await res.json()
//   const prefectures = json.prefectures

//   const paths = prefectures.map((prefecture) => ({
//     params: { prefecture_name_e: prefecture.name_e },
//   }))

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const response = await fetch(
//     `${process.env.apiHost}prefectures/${params.prefecture_name_e}`
//   )
//   const json = await response.json()

//   const prefecture = json.prefecture
//   const cities = json.cities
//   const shops = json.shops
//   const chainShops = json.main_shops

//   return { props: { prefecture, cities, shops, chainShops } }
// }

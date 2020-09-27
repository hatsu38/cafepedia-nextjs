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
  prefectures: PropTypes.array,
  stations: PropTypes.array,
  chainShop: PropTypes.object,
  shops: PropTypes.array,
}

export default function Index({ prefectures, stations, chainShop, shops }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  if (!chainShop) {
    return <NotFoundError />
  }
  const titlePrefix = "カフェペディア | "
  const titleBase = `${chainShop.name}の電源のあるカフェ一覧`
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
          chainShop={chainShop}
          prefectures={prefectures}
          shops={shops}
          title={titleBase}
        />
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getServerSideProps({ params }) {
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

// export async function getStaticPaths() {
//   const res = await fetch(`${process.env.apiHost}main_shops`)
//   const json = await res.json()
//   const chainShops = json.main_shops

//   const paths = chainShops.map((chainShop) => ({
//     params: {
//       eng_name: chainShop.eng_name,
//     },
//   }))

//   return { paths, fallback: true }
// }

// export async function getStaticProps({ params }) {
//   const response = await fetch(
//     `${process.env.apiHost}/main_shops/${params.eng_name}`
//   )
//   const json = await response.json()

//   const prefectures = json.prefectures
//   const stations = json.stations
//   const chainShop = json.main_shop
//   const shops = json.shops

//   return {
//     props: { prefectures, stations, chainShop, shops },
//   }
// }

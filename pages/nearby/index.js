import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import SidebarWithShopLists from "components/sidebarWithShopLists"

const propTypes = {
  city: PropTypes.object,
  cities: PropTypes.array,
  stations: PropTypes.array,
  shops: PropTypes.array,
}

export default function Index({ city, cities, stations, shops }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const title = `現在地からの検索結果`

  return (
    <Layout>
      <Head>
        <title>カフェペディア | {title}</title>
      </Head>
      <Container>
        <SidebarWithShopLists
          city={city}
          cities={cities}
          stations={stations}
          shops={shops}
          title={title}
        />
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getServerSideProps({ query }) {
  const response = await fetch(
    `${process.env.apiHost}search/positions?lat=${query.lat}&lng=${query.lng}`
  )
  const json = await response.json()

  const stations = json.stations
  const cities = json.cities
  const city = json.city
  const shops = json.shops

  return { props: { city, cities, stations, shops } }
}

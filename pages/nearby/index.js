import React from "react"
import PropTypes from "prop-types"
import { NextSeo } from "next-seo"
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
  shopsTotalCount: PropTypes.number.isRequired,
  fetchUrl: PropTypes.string.isRequired,
}

export default function Index({
  city,
  cities,
  stations,
  shops,
  shopsTotalCount,
  fetchUrl,
}) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const titlePrefix = "カフェペディア | "
  const titleBase = `現在地からの検索結果`
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
          city={city}
          cities={cities}
          stations={stations}
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

export async function getServerSideProps({ query }) {
  const fetchUrl = `${process.env.apiHost}search/positions?lat=${query.lat}&lng=${query.lng}`
  const response = await fetch(fetchUrl)
  const json = await response.json()

  const stations = json.stations
  const cities = json.cities
  const city = json.city
  const shops = json.shops
  const shopsTotalCount = json.shops_total_count

  return {
    props: {
      city: city,
      cities: cities,
      stations: stations,
      shops: shops,
      fetchUrl: fetchUrl,
      shopsTotalCount: shopsTotalCount,
    },
  }
}

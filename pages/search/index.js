import React from "react"
import PropTypes from "prop-types"
import { NextSeo } from "next-seo"
import { useRouter } from "next/router"
import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import SidebarWithShopLists from "components/sidebarWithShopLists"

const propTypes = {
  cities: PropTypes.array,
  stations: PropTypes.array,
  shops: PropTypes.array,
  shopsTotalCount: PropTypes.number.isRequired,
  fetchUrl: PropTypes.string.isRequired,
}

export default function Index({
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

  const { keyword } = router.query
  const titlePrefix = "カフェペディア | "
  const titleBase = `${keyword}を含む電源のあるカフェ検索結果`
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
        {shops && (
          <SidebarWithShopLists
            cities={cities}
            stations={stations}
            shops={shops}
            title={title}
            fetchUrl={fetchUrl}
            shopsTotalCount={shopsTotalCount}
          />
        )}
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getServerSideProps({ query }) {
  const fetchUrl = `${
    process.env.apiHost
  }search/keywords?keyword=${encodeURIComponent(query.keyword)}`
  const response = await fetch(fetchUrl)
  const json = await response.json()

  const stations = json.stations
  const cities = json.cities
  const shops = json.shops
  const shopsTotalCount = json.shops_total_count

  return {
    props: {
      cities: cities,
      stations: stations,
      shops: shops,
      fetchUrl: fetchUrl,
      shopsTotalCount: shopsTotalCount,
    },
  }
}

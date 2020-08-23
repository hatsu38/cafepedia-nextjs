import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "../../../components/layout"
import Cities from "../../../components/sidebars/cities"
import ShopLists from "../../../components/shopLists"

import "../../../stylesheets/prefecture_name_e.module.scss"

const propTypes = {
  prefecture: PropTypes.object,
  shops: PropTypes.array,
  city: PropTypes.object,
}

export default function Index({ prefecture, shops, city }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>カフェペディア | カフェ一覧</title>
      </Head>
      <Container className="d-flex">
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">
            {city.name}の電源のあるカフェ{shops.length}選
          </h1>
          <ShopLists shops={shops} />
        </div>
      </Container>
    </Layout>
  )
}

Index.propTypes = propTypes

export async function getStaticPaths() {
  const res = await fetch(`${process.env.apiHost}prefectures/tokyo/cities`)
  console.log("RES", res)
  const json = await res.json()
  const cities = json.cities
  const prefecture = json.prefecture

  const paths = cities.map((city) => ({
    params: {
      prefecture_name_e: prefecture.name_e,
      city_code: city.code,
    },
  }))

  return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
  const citiesRes = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities/${params.city_code}`
  )
  const citiesJson = await citiesRes.json()

  const prefecture = citiesJson.prefecture
  const city = citiesJson.city
  const shops = prefecture.shops

  return { props: { prefecture, shops, city } }
}

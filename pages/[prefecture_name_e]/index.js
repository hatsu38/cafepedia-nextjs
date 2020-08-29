import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { useRouter } from "next/router"

import fetch from "isomorphic-unfetch"

import { Container } from "react-bootstrap"
import Layout from "components/layout"
import Cities from "components/sidebars/cities"
import ShopLists from "components/shopLists"

import "stylesheets/prefecture_name_e.module.scss"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  shops: PropTypes.array.isRequired,
  cities: PropTypes.array.isRequired,
}

export default function Index({ prefecture, shops, cities }) {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <Head>
        <title>
          カフェペディア | {prefecture.name}の電源のあるカフェ{shops.length}選
        </title>
      </Head>
      <Container className="d-flex">
        <div className="sidebars-left">
          <Cities cities={cities.slice(0, 12)} prefecture={prefecture} />
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">
            {prefecture.name}の電源のあるカフェ{shops.length}選
          </h1>
          <ShopLists shops={shops} />
        </div>
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
  const prefectureRes = await fetch(
    `${process.env.apiHost}prefectures/${params.prefecture_name_e}`
  )
  const prefectureJson = await prefectureRes.json()

  const prefecture = prefectureJson.prefecture
  const shops = prefectureJson.shops
  const cities = prefectureJson.cities

  return { props: { prefecture, shops, cities } }
}

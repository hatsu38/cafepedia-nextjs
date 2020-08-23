import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'


import { Container } from "react-bootstrap"
import Layout from './../components/layout'
import Cities from './../components/sidebars/cities'
import ShopLists from './../components/shopLists'

import './../stylesheets/prefecture_name_e.module.scss'

function Prefecture({ prefecture, shops, cities }) {
  const [page, setPage] = useState(0)

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
        <div className="sidebars-right">
          <Cities cities={cities} prefecture={prefecture} />
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">{prefecture.name}の電源のあるカフェ{shops.length}選</h1>
          <ShopLists shops={shops} />
        </div>
      </Container>
      <li>{prefecture.name}</li>
      <li>lat: {shops[3].lat}</li>
      <li>lng: {shops[3].lng}</li>
      <li>address: {shops[3].access}</li>
      <button onClick={() => setPage(page + 1)}>
        Click me
      </button>
    </Layout>
  )
}

export default Prefecture

export async function getStaticPaths() {
  const res = await fetch(`${process.env.apiHost}prefectures/`)
  const json = await res.json()
  const prefectures = json.prefectures

  const paths = prefectures.map((prefecture) => (
    { params: { prefecture_name_e: prefecture.name_e } }
  ))

  return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {

  // TODO: このリクエストでその都道府県の市区町村一覧も取得する
  const prefectureRes = await fetch(`${process.env.apiHost}prefectures/${params.prefecture_name_e}`)
  const prefectureJson = await prefectureRes.json()

  const citiesRes = await fetch(`${process.env.apiHost}prefectures/${params.prefecture_name_e}/cities`)
  const citiesJson = await citiesRes.json()

  const prefecture = prefectureJson.prefecture
  const shops = prefecture.shops
  const cities = citiesJson.cities

  return { props: { prefecture, shops, cities } }
}

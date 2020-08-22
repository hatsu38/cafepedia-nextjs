import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'


import { Navbar, Container } from "react-bootstrap"
import Layout from '../../components/layout'
import ChainShops from '../../components/sidebars/chainShops'
import ShopLists from '../../components/shopLists'

import '../../stylesheets/chain_shops/id.module.scss'

function ChainShop({ mainShop, shops, popularChainShops }) {
  const [page, setPage] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${page} times`;
  }, [page])

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
          <ChainShops chainShops={popularChainShops} currentChainShop={mainShop} />
        </div>
        <div className="main-columns ml-3">
          <h1 className="main-columns--title">{mainShop.name}の電源のあるカフェ{shops.length}選</h1>
          <ShopLists shops={shops} />
        </div>
      </Container>
      <li>{mainShop.name}</li>
      <li>lat: {shops[3].lat}</li>
      <li>lng: {shops[3].lng}</li>
      <li>address: {shops[3].access}</li>
      <button onClick={() => setPage(page + 1)}>
        Click me
      </button>
    </Layout>
  )
}

export default ChainShop

export async function getStaticPaths() {
  const res = await fetch(`${process.env.apiHost}main_shops/`)
  const json = await res.json()
  const main_shops = json.main_shops

  const paths = main_shops.map((main_shop) => ({
    params: { id: main_shop.id.toString() },
  }))

  return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {

  const mainShopRes = await fetch(`${process.env.apiHost}main_shops/${params.id}`)
  const mainShopJson = await mainShopRes.json()
  const popularChainShopsRes = await fetch(`${process.env.apiHost}popular_main_shops`)
  const popularChainShopsJson = await popularChainShopsRes.json()


  const mainShop = mainShopJson.main_shop
  const shops = mainShopJson.shops
  const popularChainShops = popularChainShopsJson.main_shops

  return { props: { mainShop,　shops, popularChainShops } }
}
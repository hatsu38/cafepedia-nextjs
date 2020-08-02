import React, { useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'
import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'

function Index({ shops }) {
  const [cafes, setCount] = useState(shops)
  const [page, setPage] = useState(1)

  return (
    <Layout>
      <Head>
        <title>カフェペディア | カフェ一覧</title>
      </Head>
      <div className="container">
        <Link href="/"><a>Top</a></Link>
        <h1>Cafes{page}</h1>
      </div>
      {cafes.map((shop) => (
        <li>{shop.name}</li>
      ))}
    </Layout>
  )
}


export default Index

export async function getServerSideProps() {
  const res = await fetch('https://cafepedia-api.herokuapp.com/api/shops')
  const json = await res.json()
  const shops = json.shops
  return {
    props: {　shops }
  }
}

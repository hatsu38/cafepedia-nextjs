import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import About from '../components/about'
import Prefectures from '../components/prefectures'

import fetch from 'isomorphic-unfetch'
import { useRouter } from 'next/router'

function Index({prefectures}) {
  return (
    <Layout>
      <Head>
        <title>カフェペディア</title>
      </Head>
      <About />
      <Prefectures prefectures={prefectures} />
    </Layout>
  )
}

export default Index

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const prefRes = await fetch(`https://cafepedia-api.herokuapp.com/api/prefectures`)
  const json = await prefRes.json()
  const prefectures = json.prefectures
  // Pass post data to the page via props
  return { props: { prefectures } }
}
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import fetch from 'isomorphic-unfetch'

import Layout from '../../components/layout'

function Shop({ cafe }) {
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
      <div className="container">
        <Link href="/"><a>Top</a></Link>
        <h1>Cafes{page}</h1>
      </div>
      <li>{cafe.name}</li>
      <div>
        
      </div>

      <button onClick={() => setPage(page + 1)}>
        Click me
      </button>
    </Layout>
  )
}

export default Shop

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.apiHost}shops/`)
  const json = await res.json()
  const shops = json.shops

  // Get the paths we want to pre-render based on posts
  const paths = shops.map((post) => ({
    params: { id: post.id.toString() },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`${process.env.apiHost}shops/${params.id}`)
  const json = await res.json()
  const cafe = json.shop
  // Pass post data to the page via props
  return { props: { cafe } }
}
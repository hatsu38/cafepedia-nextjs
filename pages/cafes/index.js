import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/layout'

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>カフェペディア | カフェ一覧</title>
        </Head>
        <div className="container">
          <Link href="/">Top</Link>
          <h1>Cafes</h1>
        </div>
      </Layout>
    )
  }
}

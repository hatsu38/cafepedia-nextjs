import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
export default class Home extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>カフェペディア</title>
        </Head>
        <div className="container">
          <h1>hoge</h1>
          Read <Link href="/cafes"><a>to Cafes Page!</a></Link>
        </div>
      </Layout>
    )
  }
}

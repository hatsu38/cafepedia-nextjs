import React, { Component } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Layout from '../components/layout'
import About from '../components/about'
export default class Home extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>カフェペディア</title>
        </Head>
        <div className="container">
          <About />
        </div>
      </Layout>
    )
  }
}

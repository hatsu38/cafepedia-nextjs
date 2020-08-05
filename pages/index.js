import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { Container } from "react-bootstrap"

// Component
import Layout from '../components/layout'
import About from '../components/about'
import Prefectures from '../components/prefectures'

// Style
import '../stylesheets/index.module.scss'


function Index({prefectures}) {
  return (
    <Layout>
      <Head>
        <title>カフェペディア</title>
      </Head>
      <div className="position-relative">
        <div className="bg-image__item" style={{backgroundImage: "url(/images/bg-header.jpg)"}}>
          <div className="bg-image__item-overlay"></div>
          <Container>
            <About />
            <Prefectures prefectures={prefectures} />
          </Container>
        </div>
      </div>
    </Layout>
  )
}

export default Index

export async function getStaticProps({ params }) {
  const prefRes = await fetch(`https://cafepedia-api.herokuapp.com/api/prefectures`)
  const json = await prefRes.json()
  const prefectures = json.prefectures
  return { props: { prefectures } }
}
import React from "react"
import PropTypes from "prop-types"
import { NextSeo } from "next-seo"
import "stylesheets/layout.module.scss"
import Header from "../header/index"

const propTypes = {
  children: PropTypes.array.isRequired,
}

export default function Layout({ children }) {
  return (
    <React.Fragment>
      {/* 仮でサイトを確認するため一時的にNo Indexをつけている */}
      <NextSeo noindex={true} />
      <Header />
      {children}
    </React.Fragment>
  )
}

Layout.propTypes = propTypes

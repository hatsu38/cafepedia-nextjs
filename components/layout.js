import React from "react"
import PropTypes from "prop-types"
import "stylesheets/layout.module.scss"
import Header from "../header/index"

const propTypes = {
  children: PropTypes.array.isRequired,
}

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

Layout.propTypes = propTypes

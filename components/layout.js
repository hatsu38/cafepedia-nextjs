import React from "react"
import PropTypes from "prop-types"
import "stylesheets/layout.module.scss"
import Header from "components/header"
import Footer from "components/footer"

const propTypes = {
  children: PropTypes.array.isRequired,
}

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}

Layout.propTypes = propTypes

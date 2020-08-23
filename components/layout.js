import React from "react"
import PropTypes from "prop-types"
import "../stylesheets/layout.module.scss"
import Header from "../header/index"

const propTypes = {
  children: PropTypes.object.isRequired,
}

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  )
}

Layout.propTypes = propTypes

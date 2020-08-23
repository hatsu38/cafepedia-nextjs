import React from "react"
import PropTypes from "prop-types"
import "../stylesheets/global.scss"

const propTypes = {
  Component: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
}
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

App.propTypes = propTypes

import React from "react"
import PropTypes from "prop-types"
import * as Sentry from "@sentry/node"
import "../stylesheets/global.scss"

const propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
}

if (process.env.SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    dsn: process.env.SENTRY_DSN,
  })
}

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

App.propTypes = propTypes

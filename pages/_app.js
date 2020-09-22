import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

import * as Sentry from "@sentry/react"
import * as gtag from "lib/gtag"
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
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  console.log("HOGEHOGE", process.env.GA_TRACKING_ID)
  return <Component {...pageProps} />
}

App.propTypes = propTypes

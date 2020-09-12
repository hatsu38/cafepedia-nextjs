import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

const propTypes = {
  children: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  classes: PropTypes.string,
}

export default function Layout({ href, as, classes, children }) {
  return (
    <React.Fragment>
      <Link href={href} as={as}>
        <a href={as} className={classes}>
          {children}
        </a>
      </Link>
    </React.Fragment>
  )
}

Layout.propTypes = propTypes

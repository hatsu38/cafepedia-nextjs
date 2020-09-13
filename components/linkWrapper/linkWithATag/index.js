import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

const propTypes = {
  href: PropTypes.string.isRequired,
  as: PropTypes.string.isRequired,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
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

import React from "react"
import PropTypes from "prop-types"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  children: PropTypes.object.isRequired,
  prefecture: PropTypes.object.isRequired,
  classes: PropTypes.string,
}

export default function Layout({ prefecture, classes, children }) {
  return (
    <LinkWithATag
      href="/[prefecture_name_e]"
      as={`/${prefecture.name_e}`}
      classes={classes}
    >
      {children}
    </LinkWithATag>
  )
}

Layout.propTypes = propTypes

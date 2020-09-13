import React from "react"
import PropTypes from "prop-types"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  prefecture: PropTypes.object.isRequired,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
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

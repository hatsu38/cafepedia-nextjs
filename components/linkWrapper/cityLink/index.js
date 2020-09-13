import React from "react"
import PropTypes from "prop-types"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  city: PropTypes.object.isRequired,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}

export default function Layout({ city, classes, children }) {
  return (
    <LinkWithATag
      href="/[prefecture_name_e]/[city_code]"
      as={`/${city.prefecture_name_e}/${city.code}`}
      classes={classes}
    >
      {children}
    </LinkWithATag>
  )
}

Layout.propTypes = propTypes

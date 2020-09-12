import React from "react"
import PropTypes from "prop-types"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  children: PropTypes.object.isRequired,
  station: PropTypes.object.isRequired,
  classes: PropTypes.string,
}

export default function Layout({ station, classes, children }) {
  return (
    <LinkWithATag
      href="/[prefecture_name_e]/[city_code]/stations/[station_id]"
      as={`/${station.prefecture_name_e}/${station.city_code}/stations/${station.id}`}
      classes={classes}
    >
      {children}
    </LinkWithATag>
  )
}

Layout.propTypes = propTypes

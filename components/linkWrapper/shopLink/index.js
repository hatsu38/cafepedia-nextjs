import React from "react"
import PropTypes from "prop-types"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  shop: PropTypes.object.isRequired,
  classes: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
}

export default function Layout({ shop, classes, children }) {
  const shopComponentPath =
    "/[prefecture_name_e]/[city_code]/chain_shops/[eng_name]/[shop_id]"
  return (
    <LinkWithATag
      href={shopComponentPath}
      as={`/${shop.prefecture_name_e}/${shop.city_code}/chain_shops/${shop.main_shop.eng_name}/${shop.id}`}
      classes={classes}
    >
      {children}
    </LinkWithATag>
  )
}

Layout.propTypes = propTypes

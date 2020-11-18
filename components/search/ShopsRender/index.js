import React from "react"
import PropTypes from "prop-types"
import ShopLink from "components/linkWrapper/shopLink"
import BadgeRender from "../BadgeRender"
import BadgeTitle from "../BadgeTitle"

const propTypes = {
  shops: PropTypes.array,
  chainShopName: PropTypes.string.isRequired,
  setKeywordAndHandleClose: PropTypes.func.isRequired,
}

export default function Index(props) {
  const { shops, chainShopName, setKeywordAndHandleClose } = props

  const shopsFilterByChainShops = (chainShopName) => {
    return shops.filter((shop) => shop.main_shop.eng_name === chainShopName)
  }

  const filteredShops = shopsFilterByChainShops(chainShopName)

  if (!shops.length || !filteredShops.length) {
    return null
  }

  return (
    <React.Fragment key={`search-shop-node-${chainShopName}`}>
      <BadgeTitle name={chainShopName} />
      {filteredShops.map((shop) => (
        <ShopLink shop={shop} key={`search-shop-${shop.id}`}>
          <BadgeRender
            name={shop.name}
            setKeywordAndHandleClose={setKeywordAndHandleClose}
          />
        </ShopLink>
      ))}
      <hr />
    </React.Fragment>
  )
}

Index.propTypes = propTypes

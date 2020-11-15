import React, { useState } from "react"
import PropTypes from "prop-types"

import "./index.module.scss"
import { Button } from "react-bootstrap"

import ShopList from "./ShopList"

const propTypes = {
  shops: PropTypes.array.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  shopsTotalCount: PropTypes.number.isRequired,
}

export default function Index(props) {
  const [page, setPage] = useState(2)
  const [readShops, setReadShops] = useState(props.shops)
  const [moreReadableShops, setMoreReadableShops] = useState(
    props.shopsTotalCount > props.shops.length
  )

  const moreReadShops = async () => {
    const { shopsTotalCount, fetchUrl } = props

    if (!moreReadableShops) {
      setMoreReadableShops(false)
    }
    const pagingUrl = fetchUrl + "?page=" + page
    const response = await fetch(pagingUrl)
    const json = await response.json()
    const addShops = readShops.concat(json.shops)

    setReadShops(addShops)
    setPage(page + 1)
    setMoreReadableShops(shopsTotalCount > addShops.length)
  }

  return (
    <div className="shop__lists">
      {readShops.length > 0
        ? readShops.map((shop) => (
            <ShopList shop={shop} key={`ShopList-${shop.id}`} />
          ))
        : null}
      {moreReadableShops && (
        <div className="text-center mt-2">
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => moreReadShops()}
          >
            もっと見る
          </Button>
        </div>
      )}
    </div>
  )
}

Index.propTypes = propTypes

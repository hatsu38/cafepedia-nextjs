import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import Cities from "components/sidebars/cities"
import Stations from "components/sidebars/stations"
import ChainShops from "components/sidebars/chainShops"
import Prefectures from "components/sidebars/prefectures"
import FacilityFilter from "components/facilityFilter"
import "stylesheets/sidebars/sidebars.module.scss"

import ShopLists from "components/shopLists"
import Search from "components/search"

const defaultProps = {
  chainShops: [],
  stations: [],
  cities: [],
  prefectures: [],
  chainShop: undefined,
  prefecture: undefined,
  city: undefined,
}

const propTypes = {
  chainShops: PropTypes.array,
  stations: PropTypes.array,
  cities: PropTypes.array,
  prefectures: PropTypes.array,
  city: PropTypes.object,
  prefecture: PropTypes.object,
  chainShop: PropTypes.object,
  shops: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default function Index({
  chainShops,
  stations,
  cities,
  prefectures,
  city,
  prefecture,
  chainShop,
  shops,
  title,
}) {
  return (
    <Row>
      <Col xs={12} sm={3} className="pr-md-0 sidebars-left">
        {stations.length ? <Stations stations={stations} /> : null}
        {cities.length ? (
          <Cities cities={cities.slice(0, 12)} prefecture={prefecture} />
        ) : null}
        {chainShops.length ? (
          <ChainShops
            chainShops={chainShops.slice(0, 8)}
            prefecture={prefecture}
            city={city}
          />
        ) : null}
        {prefectures.length && chainShop ? (
          <Prefectures prefectures={prefectures} chainShop={chainShop} />
        ) : null}
      </Col>
      <Col xs={12} sm={9}>
        <Search propsStations={stations} propsCities={cities} />
        <h1 className="main-columns--title">{title}</h1>
        <ShopLists shops={shops} />
      </Col>
    </Row>
  )
}

Index.propTypes = propTypes
Index.defaultProps = defaultProps

import React, { Component } from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"
import Cities from "components/sidebars/cities"
import Stations from "components/sidebars/stations"
import ChainShops from "components/sidebars/chainShops"
import Prefectures from "components/sidebars/prefectures"
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
  shops: PropTypes.array,
  title: PropTypes.string.isRequired,
  shopsTotalCount: PropTypes.number.isRequired,
  fetchUrl: PropTypes.string.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popularStations: [],
      popularChainShops: [],
    }
  }

  fetchPopularChainShop = async () => {
    const popularChainShopsRes = await fetch(
      `${process.env.apiHost}popular/main_shops`
    )
    const popularChainShopsJson = await popularChainShopsRes.json()
    this.setState({ popularChainShops: popularChainShopsJson.main_shops })
  }

  fetchPopularStations = async () => {
    const popularStationsRes = await fetch(
      `${process.env.apiHost}popular/stations`
    )
    const popularStationsJson = await popularStationsRes.json()
    this.setState({ popularStations: popularStationsJson.stations })
  }

  fetchPopularChainShop = async () => {
    const popularChainShopsRes = await fetch(
      `${process.env.apiHost}popular/main_shops`
    )
    const popularChainShopsJson = await popularChainShopsRes.json()
    this.setState({ popularChainShops: popularChainShopsJson.main_shops })
  }

  hasSearchedSidebar = () => {
    const { chainShops, stations, cities, prefectures } = this.props
    const bool =
      chainShops.length > 0 ||
      stations.length > 0 ||
      prefectures.length > 0 ||
      cities.length > 0
    return bool
  }

  hasPopularSidebar = () => {
    const { popularStations, popularChainShops } = this.state
    return popularStations.length > 0 || popularChainShops.length > 0
  }

  hasSidebar = () => {
    return this.hasPopularSidebar() || this.hasSearchedSidebar()
  }

  render() {
    const {
      chainShops,
      stations,
      cities,
      prefectures,
      city,
      prefecture,
      chainShop,
      shops,
      fetchUrl,
      shopsTotalCount,
      title,
    } = this.props
    const { popularChainShops, popularStations } = this.state
    if (!this.hasSidebar()) {
      this.fetchPopularChainShop()
      this.fetchPopularStations()
    }

    return (
      <Row>
        <Col xs={12} sm={3} className="pr-md-0 sidebars-left">
          {stations.length > 0 && <Stations stations={stations} />}
          {this.hasPopularSidebar() && popularStations.length ? (
            <Stations stations={popularStations} />
          ) : null}
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
          {this.hasPopularSidebar() && popularChainShops.length ? (
            <ChainShops chainShops={popularChainShops.slice(0, 8)} />
          ) : null}
          {prefectures.length ? (
            <Prefectures prefectures={prefectures} chainShop={chainShop} />
          ) : null}
        </Col>
        <Col xs={12} sm={9}>
          <Search propsStations={stations} propsCities={cities} />
          <h1 className="main-columns--title">{title}</h1>
          {shops.length > 0 ? (
            <ShopLists
              shops={shops}
              shopsTotalCount={shopsTotalCount}
              fetchUrl={fetchUrl}
            />
          ) : (
            <div>該当するお店は見つかりませんでした。</div>
          )}
        </Col>
      </Row>
    )
  }
}

Index.propTypes = propTypes
Index.defaultProps = defaultProps

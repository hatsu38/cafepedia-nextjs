import React, { Component } from "react"
import PropTypes from "prop-types"

import fetch from "isomorphic-unfetch"

import { InputGroup, FormControl, Button, Modal, Badge } from "react-bootstrap"

import CityLink from "components/linkWrapper/cityLink"
import PrefectureLink from "components/linkWrapper/prefectureLink"
import ShopLink from "components/linkWrapper/shopLink"
import StationLink from "components/linkWrapper/stationLink"
import LinkWithATag from "components/linkWrapper/linkWithATag"

import BadgeTitle from "./BadgeTitle"
import CurrentSearchLink from "./CurrentSearchLink"
import NoResultContentText from "./NoResultContentText"
import BadgeRender from "./BadgeRender"

import "./index.module.scss"

const defaultProps = {
  propsStations: [],
  propsCities: [],
}

const propTypes = {
  propsStations: PropTypes.array,
  propsCities: PropTypes.array,
}

// TODO: 肥大化してきたのでよきところで小さなComponentを作っていく
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      keyword: "",
      prefectures: [],
      cities: [],
      stations: [],
      shops: [],
    }
  }

  async componentDidMount() {
    try {
      const prefectures = await import("lib/datas/prefectures.json")
      this.setState({ prefectures: prefectures.datas })
    } catch (error) {
      console.error(error)
    }
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  setKeywordAndHandleClose = (keyword) => {
    // TODO: 検索フォームは全ページで使用されるため、KeywordをStoreにおいた方がいいかも
    this.setState({
      show: false,
      keyword: keyword,
    })
  }

  prefecturesFilteredInArea(area) {
    const { prefectures } = this.state
    if (!prefectures.length) {
      return []
    }
    return prefectures.filter((prefecture) => prefecture.area === area)
  }

  prefMaps = (area) => {
    return this.prefecturesFilteredInArea(area).map((prefecture) => (
      <PrefectureLink
        prefecture={prefecture}
        key={`search-prefecture-${prefecture.name_e}`}
      >
        <BadgeRender
          name={prefecture.ellipsis_name}
          setKeywordAndHandleClose={this.setKeywordAndHandleClose}
        />
      </PrefectureLink>
    ))
  }

  shopsFilterByChainShops = (chainShopName) => {
    const { shops } = this.state
    if (!shops.length) {
      return []
    }
    return shops.filter((shop) => shop.main_shop.eng_name === chainShopName)
  }

  filteredShopsRender = (chainShopName) => {
    const filteredShops = this.shopsFilterByChainShops(chainShopName)
    if (filteredShops.length) {
      return (
        <React.Fragment key={`search-shop-node-${chainShopName}`}>
          <BadgeTitle name={chainShopName} />
          {filteredShops.map((shop) => (
            <ShopLink shop={shop} key={`search-shop-${shop.id}`}>
              <BadgeRender
                name={shop.name}
                setKeywordAndHandleClose={this.setKeywordAndHandleClose}
              />
            </ShopLink>
          ))}
          <hr />
        </React.Fragment>
      )
    }
  }

  areaSearch = async (e) => {
    const keyword = e.target.value
    const response = await fetch(
      `${process.env.apiHost}search/keywords?keyword=${keyword}`
    )
    const json = await response.json()

    this.setState({
      cities: json.cities,
      stations: json.stations,
      shops: json.shops,
      keyword: keyword,
    })
  }

  fetchCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.successGetPosition,
        this.failGetPosition
      )
    } else {
      alert("ご使用中のブラウザは現在地検索に対応されておりません。")
    }
  }

  successGetPosition = async (position) => {
    if (position.coords) {
      // TODO: Function ComponentにしたらuseRouterを使ってリダイクレトできるので、それまでの間の暫定対応
      const url = `/nearby?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
      window.location.href = url
    }
  }

  failGetPosition = (error) => {
    console.log("error", error)
    switch (error.code) {
      case 1:
        alert("位置情報の提供を許可してください。")
        break
      case 2:
        alert("位置情報の取得に失敗しました。")
        break
      default:
        alert("位置情報の取得に失敗しました。")
        break
    }
  }

  haveSearchResultContent = () => {
    const { cities, stations, shops, keyword } = this.state
    if (!keyword) {
      return true
    }
    return stations.length || cities.length || shops.length ? true : false
  }

  render() {
    const { propsCities, propsStations } = this.props
    const { show, prefectures, cities, stations, shops, keyword } = this.state
    const areas = [
      "北海道・東北",
      "関東",
      "関西",
      "中部",
      "中国",
      "四国",
      "九州・沖縄",
    ]
    const majorChainShops = [
      "starbacks",
      "doutor",
      "komeda",
      "tullys",
      "pronto",
      "execelsior",
      "ueshima",
      "kissa_renoir",
    ]
    const areaRender = areas.map((area) => (
      <div key={area}>
        <BadgeTitle name={area} />
        {this.prefMaps(area)}
        <hr />
      </div>
    ))

    const shopsRender = majorChainShops.map((chainShop) =>
      this.filteredShopsRender(chainShop)
    )

    let searchCities = propsCities
    if (cities.length > 0) {
      searchCities = cities
    } else if (keyword) {
      searchCities = []
    }

    let searchStations = propsStations
    if (stations.length > 0) {
      searchStations = stations
    } else if (keyword) {
      searchStations = []
    }

    const modalSearchButton = (
      <Button className="bg-accent f6 text-reset">
        {keyword ? (
          <span onClick={this.handleClose}>
            <LinkWithATag
              href={`/search?keyword=${keyword}`}
              as={`/search?keyword=${keyword}`}
              classes="white-text text-decoration-none"
            >
              検索
            </LinkWithATag>
          </span>
        ) : (
          <span className="white-text text-decoration-none">検索</span>
        )}
      </Button>
    )

    return (
      <React.Fragment>
        <InputGroup className="mb-2">
          <FormControl
            placeholder="エリア・駅"
            aria-label="エリア・駅"
            className="f6"
            onClick={this.handleShow}
            defaultValue={keyword}
          />
          <InputGroup.Append>
            <Button
              className="bg-accent border-0 f6 text-decoration-none"
              onClick={this.handleShow}
            >
              検索
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <InputGroup>
              <FormControl
                placeholder="エリア・駅"
                aria-label="エリア・駅"
                className="f6"
                onChange={this.areaSearch}
                defaultValue={keyword}
              />
              <InputGroup.Append>{modalSearchButton}</InputGroup.Append>
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            {!this.haveSearchResultContent() && (
              <NoResultContentText keyword={keyword} />
            )}
            <CurrentSearchLink />
            {searchStations.length > 0 ? (
              <React.Fragment>
                <BadgeTitle name={"最寄り駅"} />
                {searchStations.map((station) => (
                  <StationLink
                    station={station}
                    key={`search-station-${station.id}`}
                  >
                    <BadgeRender
                      name={station.kanji_name}
                      setKeywordAndHandleClose={this.setKeywordAndHandleClose}
                    />
                  </StationLink>
                ))}
                <hr />
              </React.Fragment>
            ) : null}
            {searchCities.length > 0 ? (
              <React.Fragment>
                <BadgeTitle name={"市区町村"} />
                {searchCities.map((city) => (
                  <CityLink city={city} key={`search-city-${city.code}`}>
                    <BadgeRender
                      name={city.name}
                      setKeywordAndHandleClose={this.setKeywordAndHandleClose}
                    />
                  </CityLink>
                ))}
                <hr />
              </React.Fragment>
            ) : null}
            {shops.length > 0 && shopsRender}
            {prefectures.length > 0 && areaRender}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}

Index.propTypes = propTypes
Index.defaultProps = defaultProps

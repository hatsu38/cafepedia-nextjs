import React, { Component } from "react"
import PropTypes from "prop-types"

import fetch from "isomorphic-unfetch"

import { InputGroup, FormControl, Button, Modal, Badge } from "react-bootstrap"

import CityLink from "components/linkWrapper/cityLink"
import PrefectureLink from "components/linkWrapper/prefectureLink"
import ShopLink from "components/linkWrapper/shopLink"
import StationLink from "components/linkWrapper/stationLink"
import LinkWithATag from "components/linkWrapper/linkWithATag"

import "./index.module.scss"

const propTypes = {
  propsStations: PropTypes.array,
  propsCities: PropTypes.array,
}

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

  badgeTitle = (name) => {
    return <h4 className="f7 original-gray-text mb-1">{name}</h4>
  }

  badgeRender(value) {
    return (
      <Badge
        key={`value-${value}`}
        className="lighten-15-accent border-lighten-20-accent mr-2"
        onClick={() => this.setKeywordAndHandleClose(value)}
      >
        {value}
      </Badge>
    )
  }

  prefMaps = (area) => {
    return this.prefecturesFilteredInArea(area).map((prefecture) => (
      <PrefectureLink
        prefecture={prefecture}
        key={`search-prefecture-${prefecture.name_e}`}
      >
        {this.badgeRender(prefecture.ellipsis_name)}
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
          {this.badgeTitle(chainShopName)}
          {filteredShops.map((shop) => (
            <ShopLink shop={shop} key={`search-shop-${shop.id}`}>
              {this.badgeRender(shop.name)}
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
        {this.badgeTitle(area)}
        {this.prefMaps(area)}
        <hr />
      </div>
    ))
    const shopsRender = majorChainShops.map((chainShop) =>
      this.filteredShopsRender(chainShop)
    )

    const searchCities = cities.length > 0 ? cities : propsCities || []
    const searchStations = stations.length > 0 ? stations : propsStations || []
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
              <InputGroup.Append>
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
                    <span className="white-text text-decoration-none">
                      検索
                    </span>
                  )}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            {this.badgeTitle("現在地から探す")}
            <Badge
              className="lighten-15-accent border-lighten-20-accent mr-2"
              onClick={this.fetchCurrentPosition}
            >
              現在地
            </Badge>
            <hr />
            {searchStations.length > 0 && (
              <React.Fragment>
                {this.badgeTitle("最寄り駅")}
                {searchStations.map((station) => (
                  <StationLink
                    station={station}
                    key={`search-station-${station.id}`}
                  >
                    {this.badgeRender(station.kanji_name)}
                  </StationLink>
                ))}
                <hr />
              </React.Fragment>
            )}
            {searchCities.length > 0 && (
              <React.Fragment>
                {this.badgeTitle("市区町村")}
                {searchCities.map((city) => (
                  <CityLink city={city} key={`search-city-${city.code}`}>
                    {this.badgeRender(city.name)}
                  </CityLink>
                ))}
                <hr />
              </React.Fragment>
            )}
            {shops.length > 0 && shopsRender}
            {prefectures.length > 0 && areaRender}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}

Index.propTypes = propTypes

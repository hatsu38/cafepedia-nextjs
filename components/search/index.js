import React, { Component } from "react"
import PropTypes from "prop-types"

import fetch from "isomorphic-unfetch"

import { InputGroup, FormControl, Button, Modal } from "react-bootstrap"

import CityLink from "components/linkWrapper/cityLink"
import PrefectureLink from "components/linkWrapper/prefectureLink"
import StationLink from "components/linkWrapper/stationLink"

import BadgeTitle from "./BadgeTitle"
import CurrentSearchLink from "./CurrentSearchLink"
import NoResultContentText from "./NoResultContentText"
import BadgeRender from "./BadgeRender"
import ModalSearchButton from "./ModalSearchButton"
import ShopsRender from "./ShopsRender"

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

  // TODO: これで一つのFunctionComponentにしたい
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
                <ModalSearchButton
                  keyword={keyword}
                  handleClose={this.handleClose}
                />
              </InputGroup.Append>
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
            {shops.length > 0 &&
              majorChainShops.map((chainShop) => (
                <ShopsRender
                  key={`ShopsRender-${chainShop.name}`}
                  shops={this.state.shops}
                  chainShopName={chainShop.name}
                  setKeywordAndHandleClose={this.setKeywordAndHandleClose}
                />
              ))}
            {prefectures.length > 0 &&
              areas.map((area) => (
                <div key={area}>
                  <BadgeTitle name={area} />
                  {this.prefMaps(area)}
                  <hr />
                </div>
              ))}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}

Index.propTypes = propTypes
Index.defaultProps = defaultProps

import React, { Component } from "react"
import { InputGroup, FormControl, Button, Modal, Badge } from "react-bootstrap"
import fetch from "isomorphic-unfetch"
import "./index.module.scss"

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
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

  prefecturesFilteredInArea(area) {
    const { prefectures } = this.state
    if (!prefectures.length) {
      return []
    }
    return prefectures.filter((prefecture) => prefecture.area === area)
  }

  budgeRender(value) {
    return (
      <Badge
        key={`value-${value}`}
        className="lighten-15-accent border-lighten-20-accent mr-1"
      >
        {value}
      </Badge>
    )
  }

  prefMaps(area) {
    return this.prefecturesFilteredInArea(area).map((prefecture) =>
      this.budgeRender(prefecture.ellipsis_name)
    )
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  areaSearch = async (e) => {
    const keyword = e.target.value
    console.log("keyword", keyword)
    const response = await fetch(
      `${process.env.apiHost}search?keyword=${keyword}`
    )
    const json = await response.json()

    this.setState({
      cities: json.cities,
      stations: json.stations,
      shops: json.shops,
    })
  }

  badgeTitle = (name) => {
    return <h4 className="f7 original-gray-text mb-1">{name}</h4>
  }

  render() {
    const { show, prefectures, cities, stations, shops } = this.state
    const areas = [
      "北海道・東北",
      "関東",
      "関西",
      "中部",
      "中国",
      "四国",
      "九州・沖縄",
    ]
    const areaRender = areas.map((area) => (
      <div key={area}>
        {this.badgeTitle(area)}
        {this.prefMaps(area)}
        <hr />
      </div>
    ))

    return (
      <>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="エリア・駅"
            aria-label="エリア・駅"
            aria-describedby="basic-addon2"
            className="f6"
            onClick={this.handleShow}
          />
          <InputGroup.Append>
            <Button className="bg--accent border-0 f6">検索</Button>
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
              />
              <InputGroup.Append>
                <Button className="bg--accent border-0 f6">検索</Button>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Header>
          <Modal.Body>
            {cities.length > 0 && (
              <>
                {this.badgeTitle("市区町村")}
                {cities.map((city) => this.budgeRender(city.name))}
                <hr />
              </>
            )}
            {stations.length > 0 && (
              <>
                {this.badgeTitle("最寄り駅")}
                {stations.map((station) =>
                  this.budgeRender(station.kanji_name)
                )}
                <hr />
              </>
            )}
            {shops.length > 0 && (
              <>
                {this.badgeTitle("お店")}
                {shops.map((shop) => this.budgeRender(shop.name))}
                <hr />
              </>
            )}
            {prefectures && areaRender}
          </Modal.Body>
        </Modal>
      </>
    )
  }
}

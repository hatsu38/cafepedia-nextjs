import React, { Component } from "react"
import PropTypes from "prop-types"
import ShopLink from "components/linkWrapper/shopLink"
import { BigNumber } from "bignumber.js"

import "./index.module.scss"
import { ListGroup, Figure, Row, Col, Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlug,
  faWifi,
  faMapMarkerAlt,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons"

import TopInfoList from "components/topInfoList"

const propTypes = {
  shops: PropTypes.array.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  shopsTotalCount: PropTypes.number.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 2,
      readShops: [],
      moreReadableShops: false,
    }
  }

  componentDidMount() {
    const { shops, shopsTotalCount } = this.props
    const moreReadableShops = shopsTotalCount > shops.length
    this.setState({
      readShops: this.props.shops,
      moreReadableShops: moreReadableShops,
    })
  }

  shopUrlPath(shop) {
    return `/${shop.prefecture_name_e}/${shop.city_code}/chain_shops/${shop.main_shop.eng_name}/${shop.id}`
  }

  distanceToText(distance) {
    if (distance === 0) {
      return null
    }
    const bigDistance = new BigNumber(distance)
    if (bigDistance >= 1) {
      return bigDistance.dp(2) + "km"
    }
    return new BigNumber(bigDistance * 1000).dp(2) + "m"
  }

  moreReadShops = async () => {
    const { readShops, moreReadableShops, page } = this.state
    const { shopsTotalCount } = this.props

    if (!moreReadableShops) {
      this.setState({ moreReadableShops: false })
    }
    const { fetchUrl } = this.props
    const pagingUrl = fetchUrl + "?page=" + page
    const response = await fetch(pagingUrl)

    const json = await response.json()
    const addShops = readShops.concat(json.shops)
    this.setState({
      readShops: addShops,
      page: page + 1,
      moreReadableShops: shopsTotalCount > addShops.length,
    })
  }

  render() {
    const { readShops, moreReadableShops } = this.state

    const style = {
      image: { maxHeight: "106px" },
    }

    const moreReadButton = (
      <div className="text-center mt-2">
        <Button variant="outline-dark" size="sm" onClick={this.moreReadShops}>
          もっと見る
        </Button>
      </div>
    )

    const shopList = readShops.map((shop) => (
      <ListGroup className="border-bottom" variant="flush" key={shop.id}>
        <ListGroup.Item className="px-0">
          <Row noGutters>
            <Col xs={3} lg={2} className="pr-2">
              <Figure.Image
                src={shop.main_shop.logo.url}
                thumbnail
                style={style.image}
                alt={shop.main_shop.name + "ロゴ"}
                className="m-0"
              />
            </Col>
            <Col xs={9} lg={10} className="mw-100 text-truncate">
              <span className="align-top original-gray-text f8">
                {shop.main_shop.name}
              </span>
              <ShopLink shop={shop} classes="align-top">
                <h2 className="shop__name mt-n2 original-black-text text-truncate">
                  {shop.name}
                </h2>
              </ShopLink>
              <dl className="my-1 info-list original-gray-text f7 d-flex">
                <TopInfoList
                  icon={faPlug}
                  dtText="電源："
                  ddText={shop.socket ? "あり" : "なし"}
                />
                <TopInfoList
                  icon={faWifi}
                  dtText="Wi-Fi："
                  ddText={shop.wifi ? "あり" : "なし"}
                />
              </dl>
              <div className="d-none d-sm-block">
                {shop.distance !== 0 && (
                  <dl className="my-1 info-list original-gray-text f7">
                    <TopInfoList
                      icon={faLocationArrow}
                      dtText="距離："
                      ddText={this.distanceToText(shop.distance)}
                    />
                  </dl>
                )}
                <dl className="my-1 info-list original-gray-text f7">
                  <TopInfoList
                    icon={faMapMarkerAlt}
                    dtText="アクセス："
                    ddText={shop.access}
                  />
                </dl>
              </div>
            </Col>
          </Row>
          <Row noGutters className="mt-1 original-gray-text f7 d-sm-none">
            {shop.distance !== 0 && (
              <React.Fragment>
                <Col xs={1} className="text-center">
                  <FontAwesomeIcon
                    icon={faLocationArrow}
                    className="align-middle"
                    width="14"
                    height="14"
                  />
                </Col>
                <Col xs={11} className="f7">
                  {this.distanceToText(shop.distance)}
                </Col>
              </React.Fragment>
            )}
            <Col xs={1} className="text-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="align-middle"
                width="16"
                height="16"
              />
            </Col>
            <Col xs={11} className="f8">
              {shop.access}
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    ))
    return (
      <div className="shop__lists">
        {readShops.length > 0 ? shopList : null}
        {moreReadableShops && moreReadButton}
      </div>
    )
  }
}

Index.propTypes = propTypes

import React, { Component } from "react"
import PropTypes from "prop-types"
import ShopLink from "components/linkWrapper/shopLink"
import { BigNumber } from "bignumber.js"

import "./index.module.scss"
import { ListGroup, Figure, Row, Col } from "react-bootstrap"
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
}

export default class Index extends Component {
  constructor(props) {
    super(props)
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
  render() {
    const { shops } = this.props
    const style = {
      image: { maxHeight: "106px" },
    }
    const shopList = shops.map((shop) => (
      <ListGroup className="border-bottom" variant="flush" key={shop.id}>
        <ListGroup.Item className="px-0">
          <Row noGutters>
            <Col xs={3} lg={2} className="pr-2">
              <Figure.Image
                src={process.env.s3Host + shop.main_shop.image}
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
                <h3 className="shop__name mt-n2 original-black-text text-truncate">
                  {shop.name}
                </h3>
              </ShopLink>
              <dl className="my-1 info-list original-gray-text f7">
                <div className="d-flex">
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
                </div>
                <div className="d-none d-sm-block">
                  <TopInfoList
                    icon={faMapMarkerAlt}
                    dtText="アクセス："
                    ddText={shop.access}
                  />
                </div>
                {shop.distance !== 0 && (
                  <div className="d-none d-sm-block">
                    <TopInfoList
                      icon={faLocationArrow}
                      dtText="距離"
                      ddText={this.distanceToText(shop.distance)}
                    />
                  </div>
                )}
              </dl>
            </Col>
          </Row>
          <Row noGutters className="mt-1 original-gray-text f7 d-sm-none">
            <Col xs={1} className="text-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                size="2x"
                className="align-middle"
                width="18"
                height="18"
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
      <div className="shop__lists">{shops.length > 0 ? shopList : null}</div>
    )
  }
}

Index.propTypes = propTypes

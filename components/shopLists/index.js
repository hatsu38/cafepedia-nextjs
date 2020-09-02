import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import "./index.module.scss"
import { ListGroup, Image, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlug,
  faWifi,
  faMapMarkerAlt,
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
  render() {
    const { shops } = this.props
    const shopComponentPath =
      "/[prefecture_name_e]/[city_code]/chain_shops/[eng_name]/[shop_id]"
    const style = {
      image: { maxHeight: "106px" },
    }
    return (
      <div className="shop__lists">
        {shops.map((shop) => (
          <ListGroup className="border-bottom" variant="flush" key={shop.id}>
            <ListGroup.Item className="px-0">
              <Row noGutters>
                <Col xs={3} lg={2} className="pr-2">
                  <Image
                    src={process.env.s3Host + shop.main_shop.image}
                    thumbnail
                    style={style.image}
                  />
                </Col>
                <Col xs={9} lg={10} className="mw-100 text-truncate">
                  <span className="align-top original-gray-text f8">
                    {shop.main_shop.name}
                  </span>
                  <Link href={shopComponentPath} as={this.shopUrlPath(shop)}>
                    <a href={this.shopUrlPath(shop)} className="align-top">
                      <h3 className="shop__name mt-n2 original-black-text text-truncate">
                        {shop.name}
                      </h3>
                    </a>
                  </Link>
                  <dl className="my-1 info-list original-gray-text">
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
                  </dl>
                </Col>
              </Row>
              <Row noGutters className="mt-1 original-gray-text f7 d-sm-none">
                <Col xs={1}>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="2x"
                    className="mr-1 px-1 align-middle"
                  />
                </Col>
                <Col xs={11} className="f8">
                  {shop.access}
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    )
  }
}

Index.propTypes = propTypes

import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import "./index.module.scss"
import { ListGroup, Image } from "react-bootstrap"

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
      "/[prefecture_name_e]/[city_code]/chain_shop/[eng_name]/[shop_id]"

    return (
      <div className="shop__lists">
        {shops.map((shop) => (
          <ListGroup className="border-bottom" variant="flush" key={shop.id}>
            <ListGroup.Item className="d-flex px-0">
              <Image
                src={process.env.s3Host + shop.main_shop.image}
                thumbnail
                width={120}
                height={120}
              />
              <div className="shop__detail mw-100 ml-2 text-truncate">
                <Link href={shopComponentPath} as={this.shopUrlPath(shop)}>
                  <a href={this.shopUrlPath(shop)}>
                    <h3 className="shop__name original-black-text">
                      {shop.name}
                    </h3>
                  </a>
                </Link>
                <div className="shop__access original-gray-text f7 text-truncate">
                  {shop.access}
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    )
  }
}

Index.propTypes = propTypes

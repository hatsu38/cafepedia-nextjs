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

  render() {
    const { shops } = this.props

    return (
      <div className="shop__lists">
        {shops.map((shop) => (
          <Link href="/shops/[id]" as={`/shops/${shop.id}`} key={shop.id}>
            <a>
              <ListGroup className="border-bottom" variant="flush">
                <ListGroup.Item className="d-flex px-0">
                  <Image
                    src={process.env.s3Host + shop.main_shop.image}
                    thumbnail
                    width={120}
                    height={120}
                  />
                  <div className="shop__detail mw-100 ml-2 text-truncate">
                    <h3 className="shop__name original-black-text">
                      {shop.name}
                    </h3>
                    <div className="shop__access original-gray-text f7 text-truncate">
                      {shop.access}
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </a>
          </Link>
        ))}
      </div>
    )
  }
}

Index.propTypes = propTypes

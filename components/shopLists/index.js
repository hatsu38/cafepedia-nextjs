import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'

import { ListGroup } from "react-bootstrap"

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
      <div className="list-sidebar">
        {shops.map((shop) =>
          <Link href="/shops/[id]" as={`/shops/${shop.id}`} key={shop.id}>
            <a>
              <ListGroup className="">
                <ListGroup.Item>{shop.name}</ListGroup.Item>
              </ListGroup>
            </a>
          </Link>
        )}
      </div>
    )
  }
}

Index.propTypes = propTypes

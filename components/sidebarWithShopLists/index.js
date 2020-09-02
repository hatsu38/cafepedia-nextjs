import React from "react"
import PropTypes from "prop-types"
import { Row, Col } from "react-bootstrap"

import "stylesheets/sidebars/sidebars.module.scss"

import ShopLists from "components/shopLists"

const propTypes = {
  sidebar: PropTypes.object.isRequired,
  shops: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default function Index({ sidebar, shops, title }) {
  return (
    <Row>
      <Col xs={12} sm={3} className="pr-0 sidebars-left">
        {sidebar}
      </Col>
      <Col xs={12} sm={9}>
        <h1 className="main-columns--title">{title}</h1>
        <ShopLists shops={shops} />
      </Col>
    </Row>
  )
}

Index.propTypes = propTypes

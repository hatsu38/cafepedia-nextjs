import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table } from "react-bootstrap"

import Tr from "../tr"
import "./index.module.scss"

const propTypes = {
  shop: PropTypes.object.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { shop } = this.props

    return (
      <div className="shop-detail mt-4">
        <h3 className="f5 font-bold letter-space-1">基本情報</h3>
        <Table responsive bordered hover className="f7 shop-detail__table m-0">
          <tbody>
            <Tr thText="店名" tdText={shop.name} />
            <Tr thText="電話番号" tdText={shop.tel} />
            <Tr thText="ホームページ" tdText={shop.hp} link={shop.hp} />
            <Tr thText="住所" tdText={shop.full_address} />
            <Tr thText="営業時間" tdText={shop.business_hour} />
          </tbody>
        </Table>
      </div>
    )
  }
}

Index.propTypes = propTypes

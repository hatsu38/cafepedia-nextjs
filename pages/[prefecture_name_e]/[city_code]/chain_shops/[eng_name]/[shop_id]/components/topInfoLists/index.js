import React, { Component } from "react"
import PropTypes from "prop-types"

import {
  faSubway,
  faMapMarkerAlt,
  faPlug,
  faWifi,
  faSmoking,
} from "@fortawesome/free-solid-svg-icons"

import TopInfoList from "../topInfoList"

const propTypes = {
  shop: PropTypes.object.isRequired,
  station: PropTypes.object,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { shop, station } = this.props

    return (
      <div className="info-list f7 original-gray-text">
        {station && (
          <TopInfoList
            icon={faSubway}
            dtText="最寄駅："
            ddText={station.kanji_name}
          />
        )}
        <TopInfoList
          icon={faMapMarkerAlt}
          dtText="アクセス："
          ddText={shop.access}
        />
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
          <TopInfoList
            icon={faSmoking}
            dtText="喫煙席："
            ddText={shop.smoking ? "あり" : "なし"}
          />
        </div>
      </div>
    )
  }
}

Index.propTypes = propTypes

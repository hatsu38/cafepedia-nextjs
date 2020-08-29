import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import "components/sidebars/styles/index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSubway } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  stations: PropTypes.array.isRequired,
  station: PropTypes.object,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { stations, station } = this.props

    return (
      <section className="list-sidebar">
        <h2 className="list-sidebar--title m-0">
          <FontAwesomeIcon icon={faSubway} className="mr-2 accent-text" />
          最寄りの駅から探す
        </h2>
        {station && (
          <ul className="related__links">
            <li>
              <Link
                href="/[prefecture_name_e]/[city_code]/[station_id]"
                as={`/${station.prefecture_name_e}/${station.city_code}/${station.id}`}
              >
                <a
                  href={`/${station.prefecture_name_e}/${station.city_code}/${station.id}`}
                  className="related__link f8"
                >
                  {station.kanji_name}
                </a>
              </Link>
            </li>
          </ul>
        )}
        <hr className="mt-2 mb-0" />
        <ul className="pl-0 mb-0">
          {stations.map((station) => (
            <li key={station.id} className="d-inline-block mt-1 ml-1">
              <Link
                href="/[prefecture_name_e]/[city_code]/[station_id]"
                as={`/${station.prefecture_name_e}/${station.city_code}/${station.id}`}
              >
                <a
                  href={`/${station.prefecture_name_e}/${station.city_code}/${station.id}`}
                  className={"chain-shop--item f8"}
                >
                  {station.kanji_name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

Index.propTypes = propTypes

import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { Badge } from "react-bootstrap"

import "./index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  stations: PropTypes.array.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { stations } = this.props

    return (
      <section className="mt-5">
        <h2 className="section--title">人気エリアから探す</h2>
        {stations.map((station, idx) => (
          // HACK: StationのLINKとAタグは長いのでComponent化するといいかも
          <Link
            href="/[prefecture_name_e]/[city_code]/[station_id]"
            as={`/${station.prefecture_name_e}/${station.city_code}/${station.id}`}
            key={station.id}
          >
            <a
              href={`/${station.prefecture_name_e}/${station.city_code}/${station.id}`}
            >
              <Badge
                className={`station--tag original-gray mr-sm-2 mr-1 mt-sm-3 mt-2 py-1 px-2 ${
                  idx > 14 && "d-none d-sm-inline-block"
                }`}
              >
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
                {station.kanji_name}
              </Badge>
            </a>
          </Link>
        ))}
      </section>
    )
  }
}

Index.propTypes = propTypes

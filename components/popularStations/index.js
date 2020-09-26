import React, { Component } from "react"
import PropTypes from "prop-types"
import StationLink from "components/linkWrapper/stationLink"
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
          <StationLink station={station} key={station.id}>
            <Badge
              className={`station--tag original-gray mr-sm-2 mr-1 mt-sm-3 mt-2 py-1 px-2 ${
                idx > 14 && "d-none d-sm-inline-block"
              }`}
            >
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="mr-1"
                width="14"
                height="15"
              />
              {station.kanji_name}
            </Badge>
          </StationLink>
        ))}
      </section>
    )
  }
}

Index.propTypes = propTypes

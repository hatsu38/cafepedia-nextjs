import React from "react"
import PropTypes from "prop-types"
import StationLink from "components/linkWrapper/stationLink"

import "components/sidebars/styles/index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSubway } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  stations: PropTypes.array.isRequired,
  station: PropTypes.object,
}

export default function Index(props) {
  const { stations, station } = props

  return (
    <section className="list-sidebar">
      <h2 className="list-sidebar--title m-0">
        <FontAwesomeIcon
          icon={faSubway}
          className="mr-2 accent-text"
          width="17"
          height="17"
        />
        最寄りの駅から探す
      </h2>
      {station && (
        <ul className="related__links">
          <li>
            <StationLink station={station} classes="related__link f8">
              {station.kanji_name}
            </StationLink>
          </li>
        </ul>
      )}
      <hr className="mt-2 mb-0" />
      <ul className="pl-0 mb-0">
        {stations.map((station) => (
          <li key={station.id} className="d-inline-block mt-1 ml-1">
            <StationLink station={station} classes="chain-shop--item f8">
              {station.kanji_name}
            </StationLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

Index.propTypes = propTypes

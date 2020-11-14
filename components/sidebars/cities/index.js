import React from "react"
import PropTypes from "prop-types"
import CityLink from "components/linkWrapper/cityLink"
import PrefectureLink from "components/linkWrapper/prefectureLink"
import "components/sidebars/styles/index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMap } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  cities: PropTypes.array.isRequired,
  prefecture: PropTypes.object,
}

export default function Index(props) {
  const { cities, prefecture } = props

  return (
    <section className="list-sidebar">
      <h2 className="list-sidebar--title m-0">
        <FontAwesomeIcon
          icon={faMap}
          className="mr-2 accent-text"
          width="17"
          height="17"
        />
        市区町村から探す
      </h2>
      {prefecture && (
        <React.Fragment>
          <ul className="related__links">
            <li>
              <PrefectureLink
                prefecture={prefecture}
                classes="related__link f8"
              >
                {prefecture.name}
              </PrefectureLink>
            </li>
          </ul>
          <hr className="mt-2 mb-0" />
        </React.Fragment>
      )}
      <ul className="pl-0 mb-0">
        {cities.map((city) => (
          <li key={city.code} className="d-inline-block mt-1 ml-1">
            <CityLink city={city} classes="chain-shop--item f8">
              {city.name}
            </CityLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

Index.propTypes = propTypes

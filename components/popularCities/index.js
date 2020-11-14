import React from "react"
import PropTypes from "prop-types"
import CityLink from "components/linkWrapper/cityLink"
import { Badge } from "react-bootstrap"

import "./index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMap } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  cities: PropTypes.array.isRequired,
}

export default function Index(props) {
  const { cities } = props

  return (
    <section className="mt-5">
      <h2 className="section--title">人気の市区町村から探す</h2>
      {cities.map((city, idx) => (
        <CityLink city={city} key={city.id}>
          <Badge
            className={`station--tag original-gray mr-sm-2 mr-1 mt-sm-3 mt-2 py-1 px-2 ${
              idx > 14 && "d-none d-sm-inline-block"
            }`}
          >
            <FontAwesomeIcon
              icon={faMap}
              className="mr-1"
              width="14"
              height="15"
            />
            {city.name}
          </Badge>
        </CityLink>
      ))}
    </section>
  )
}

Index.propTypes = propTypes

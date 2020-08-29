import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import "components/sidebars/styles/index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMap } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  cities: PropTypes.array.isRequired,
  prefecture: PropTypes.object.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { cities, prefecture } = this.props

    return (
      <section className="list-sidebar">
        <h2 className="list-sidebar--title m-0">
          <FontAwesomeIcon icon={faMap} className="mr-2 accent-text" />
          市区町村から探す
        </h2>
        <ul className="related__links">
          <li>
            <Link href="/[prefecture_name_e]" as={`/${prefecture.name_e}`}>
              <a href={`/${prefecture.name_e}`} className="related__link f8">
                {prefecture.name}
              </a>
            </Link>
          </li>
        </ul>
        <hr className="mt-2 mb-0" />
        <ul className="pl-0 mb-0">
          {cities.map((city) => (
            <li key={city.id} className="d-inline-block mt-1 ml-1">
              <Link
                href="/[prefecture_name_e]/[city_code]"
                as={`/${prefecture.name_e}/${city.code}`}
              >
                <a
                  href={`/${prefecture.name_e}/${city.code}`}
                  className={"chain-shop--item f8"}
                >
                  {city.name}
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

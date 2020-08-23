import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import "./index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons"

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
          <FontAwesomeIcon icon={faStoreAlt} className="mr-2 accent-text" />
          市区町村から探す
        </h2>
        <ul className="related__links">
          <li>
            <Link href="/[prefecture_name_e]" as={`/${prefecture.name_e}`}>
              <span className="related__link as-link-text f8">
                {prefecture.name}
              </span>
            </Link>
          </li>
        </ul>
        <hr className="mt-2 mb-0" />
        <ul className="pl-0 mb-0">
          {cities.map((city) => (
            <li key={city.id} className="d-inline-block mt-1 ml-1">
              {/* TODO: 市区町村のPathに変更する必要がある */}
              <Link href="/prefectures/[id]" as={`/prefectures/${city.id}`}>
                <span className={"chain-shop--item as-link-text f8"}>
                  {city.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
  }
}

Index.propTypes = propTypes

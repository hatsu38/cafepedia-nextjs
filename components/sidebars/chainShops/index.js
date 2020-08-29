import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import "../styles/index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStoreAlt } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  chainShops: PropTypes.array.isRequired,
  chainShop: PropTypes.object,
  prefecture: PropTypes.object,
  city: PropTypes.object,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { chainShops, chainShop, prefecture, city } = this.props

    let componentPath = "/chain_shops/[eng_name]"
    let prefixToLink = "/chain_shops/"

    if (prefecture && city) {
      componentPath = "/[prefecture_name_e]/[city_code]/chain_shops/[eng_name]"
      prefixToLink = `/${prefecture.name_e}/${city.code}/chain_shops/`
    } else if (prefecture) {
      componentPath = "/[prefecture_name_e]/chain_shops/[eng_name]"
      prefixToLink = `/${prefecture.name_e}/chain_shops/`
    }

    return (
      <section className="list-sidebar">
        <h2 className="list-sidebar--title m-0">
          <FontAwesomeIcon icon={faStoreAlt} className="mr-2 accent-text" />
          チェーン店から探す
        </h2>
        {chainShop && (
          <ul className="related__links">
            <li>
              <Link
                href={componentPath}
                as={`${prefixToLink}${chainShop.eng_name}`}
              >
                <a
                  href={`${prefixToLink}${chainShop.eng_name}`}
                  className="related__link f8"
                >
                  {chainShop.name}
                </a>
              </Link>
            </li>
          </ul>
        )}
        <hr className="mt-2 mb-0" />
        <ul className="pl-0 mb-0">
          {chainShops.map((chainShop) => (
            <li key={chainShop.eng_name} className="d-inline-block mt-1 ml-1">
              <Link
                href={componentPath}
                as={`${prefixToLink}${chainShop.eng_name}`}
              >
                <a
                  href={`${prefixToLink}${chainShop.eng_name}`}
                  className={"chain-shop--item f8"}
                >
                  {chainShop.name}
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

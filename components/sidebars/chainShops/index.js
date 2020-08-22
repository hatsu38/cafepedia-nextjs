import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'

import "./index.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStoreAlt } from '@fortawesome/free-solid-svg-icons'

const propTypes = {
  chainShops: PropTypes.array.isRequired,
  currentChainShop: PropTypes.object
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { chainShops, currentChainShop } = this.props

    return (
      <section className="list-sidebar">
        <h2 className="list-sidebar--title m-0">
          <FontAwesomeIcon icon={faStoreAlt} className="mr-2 accent-text"/>チェーン店から探す
        </h2>
        <ul className="related__links">
          <li>
            <Link href="/chain_shops/[id]" as={`/chain_shops/${currentChainShop.id}`}>
              <a className="related__link f8">{currentChainShop.name}</a>
            </Link>
          </li>
        </ul>
        <hr className="mt-2 mb-0" />
        <ul className="pl-0 mb-0">
        {chainShops.map((chainShop) =>
          <li key={chainShop.id} className="d-inline-block mt-1 ml-1">
            <Link href="/chain_shops/[id]" as={`/chain_shops/${chainShop.id}`}>
              <a className={`chain-shop--item f8 ${chainShop.id === currentChainShop.id && "currented--item"}`}>{chainShop.name}</a>
            </Link>
          </li>
        )}
        </ul>
      </section>
    )
  }
}

Index.propTypes = propTypes

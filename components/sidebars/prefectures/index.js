import React from "react"
import PropTypes from "prop-types"
import PrefectureLink from "components/linkWrapper/prefectureLink"
import Link from "next/link"

import "components/sidebars/styles/index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMap } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
  prefecture: PropTypes.object,
  chainShop: PropTypes.object,
}

export default function Index(props) {
  const { prefectures, prefecture, chainShop } = props

  return (
    <section className="list-sidebar">
      <h2 className="list-sidebar--title m-0">
        <FontAwesomeIcon
          icon={faMap}
          className="mr-2 accent-text"
          width="17"
          height="17"
        />
        都道府県から探す
      </h2>
      {prefecture && (
        <ul className="related__links">
          <li>
            <PrefectureLink prefecture={prefecture}>
              {prefecture.name}
            </PrefectureLink>
          </li>
        </ul>
      )}
      <hr className="mt-2 mb-0" />
      <ul className="pl-0 mb-0">
        {chainShop
          ? prefectures.map((prefecture) => (
              <li key={prefecture.name_e} className="d-inline-block mt-1 ml-1">
                <Link
                  href="/[prefecture_name_e]/chain_shops/[eng_name]"
                  as={`/${prefecture.name_e}/chain_shops/${chainShop.eng_name}`}
                >
                  <a
                    href={`/${prefecture.name_e}/chain_shops/${chainShop.eng_name}`}
                    className={"chain-shop--item f8"}
                  >
                    {prefecture.name}
                  </a>
                </Link>
              </li>
            ))
          : prefectures.map((prefecture) => (
              <li key={prefecture.name_e} className="d-inline-block mt-1 ml-1">
                <Link href="/[prefecture_name_e]" as={`/${prefecture.name_e}`}>
                  <a
                    href={`/${prefecture.name_e}`}
                    className={"chain-shop--item f8"}
                  >
                    {prefecture.name}
                  </a>
                </Link>
              </li>
            ))}
      </ul>
    </section>
  )
}

Index.propTypes = propTypes

import React from "react"
import PropTypes from "prop-types"

import { Accordion, Row, Col } from "react-bootstrap"

import "./index.module.scss"
import WithOutAccordionPrefectures from "./WithOutAccordionPrefectures/"
import WithAccordionPrefectures from "./WithAccordionPrefectures/"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const indexPropTypes = {
  prefectures: PropTypes.array.isRequired,
}

export default function Index(props) {
  const { prefectures } = props
  const areas = [
    "北海道・東北",
    "関東",
    "関西",
    "中部",
    "中国",
    "四国",
    "九州・沖縄",
  ]
  return (
    <div className="area-select mt-5 base-gray-900 rounded">
      <h2 className="pt-sm-4 pt-3 px-sm-3 section--title m-sm-0 letter-space-1">
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          className="mr-2 accent-text"
          width="14"
          height="21"
        />
        都道府県から探す
      </h2>
      <Accordion>
        <Row noGutters className="py-sm-1 px-sm-3">
          {areas.map((area) => (
            <Col xs={12} md={6} xl={4} key={area}>
              <div className="area-select__region">
                <div className="d-none d-sm-block mt-3">
                  <h3 className="f6 font-wight--700 mb-1 original-gray">
                    {area}
                  </h3>
                  <WithOutAccordionPrefectures
                    area={area}
                    prefectures={prefectures}
                  />
                </div>
                <div className="d-block d-sm-none border-bottom">
                  <WithAccordionPrefectures
                    area={area}
                    prefectures={prefectures}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Accordion>
    </div>
  )
}

Index.propTypes = indexPropTypes

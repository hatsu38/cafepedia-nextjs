import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

import { Accordion, Button, Row, Col } from "react-bootstrap"

import "./index.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  prefecturesFilteredInArea(area) {
    return this.props.prefectures.filter(
      (prefecture) => prefecture.area === area
    )
  }

  withOutAccordionPrefectures(area) {
    return (
      <Row noGutters className="">
        {this.prefecturesFilteredInArea(area).map((prefecture) => (
          <Col sm md={2} key={prefecture.name_e} className="area-select__area">
            <span className="pl-3 pl-md-0">
              <Link href="/[prefecture_name_e]" as={`/${prefecture.name_e}`}>
                <a
                  href={`/${prefecture.name_e}`}
                  className="f7 area-select__area-name"
                >
                  {prefecture.ellipsis_name}
                </a>
              </Link>
            </span>
          </Col>
        ))}
      </Row>
    )
  }

  withAccordionPrefectures(area) {
    return (
      <React.Fragment>
        <Accordion.Toggle
          as={Button}
          className="area-select__region-name f6 w-100 text-left"
          variant="link"
          eventKey={area}
        >
          {area}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={area}>
          {this.withOutAccordionPrefectures(area)}
        </Accordion.Collapse>
      </React.Fragment>
    )
  }

  render() {
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
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 accent-text" />
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
                    {this.withOutAccordionPrefectures(area)}
                  </div>
                  <div className="d-block d-sm-none border-bottom">
                    {this.withAccordionPrefectures(area)}
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Accordion>
      </div>
    )
  }
}

Index.propTypes = propTypes

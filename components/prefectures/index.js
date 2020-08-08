import React, { Component } from 'react'
import { Accordion, Button, Row, Col } from "react-bootstrap"

import "./index.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  prefecturesFilteredInArea(area) {
    return this.props.prefectures.filter(prefecture => prefecture.area === area)
  }

  withOutAccordionPrefectures(area) {
    return(
      <Row noGutters className="">
        {this.prefecturesFilteredInArea(area).map((prefecture) =>
          <Col sm md={2} key={prefecture.id} className="area-select__area">
            <a href={"/" + prefecture.id} className="f7 area-select__area-name pl-3 pl-md-0">{prefecture.ellipsis_name}</a>
          </Col>
        )}
      </Row>
    )
  }

  withAccordionPrefectures(area) {
    return (
      <>
        <Accordion.Toggle as={Button} className="area-select__region-name f6 w-100 text-left" variant="link" eventKey={area}>
          {area}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={area}>
          {this.withOutAccordionPrefectures(area)}
        </Accordion.Collapse>
      </>
    )
  }

  render() {
    const areas = ["北海道・東北", "関東", "関西", "中部", "中国", "四国", "九州・沖縄"]
    return(
      <div className="area-select mt-5 base-gray-900">
        <h2 className="f4 px-2 pt-3 pb-0 mb-md-0 lettar-space-1" >
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 accent-text"/>都道府県から探す
        </h2>
        <Accordion>
          <Row noGutters className="p-sm-2">
            {areas.map((area) =>
              <Col xs={12} md={6} xl={4} key={area}>
                  <div className="area-select__region">
                    <div className="d-none d-sm-block mt-3">
                      <h3 className="f6 font-wight--600 mb-1 lettar-space-1">{area}</h3>
                      {this.withOutAccordionPrefectures(area)}
                    </div>
                    <div className="d-block d-sm-none border-bottom">
                      {this.withAccordionPrefectures(area)}
                    </div>
                  </div>
              </Col>
            )}
          </Row>
        </Accordion>
      </div>
    )
  }
}

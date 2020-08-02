import React, { Component, useState, useEffect } from 'react'
import { ListGroup, Accordion, Button, Row, Col } from "react-bootstrap"
import "./index.module.scss"

export default class Index extends Component {
  constructor(props) {
    super(props)
    // this.state = this.initialState
  }

  // get initialState() {
  //   return {
  //     areas: ["関東", "九州・沖縄", "関西", "中部", "北海道・東北", "中国", "四国"],
  //     page: 1,
  //     hasMore: false,
  //     isLoading: false
  //   }
  // }

  prefecturesFilteredInArea(area) {
    return this.props.prefectures.filter(prefecture => prefecture.area === area)
  }

  withOutAccordionPrefectures(area) {
    return(
      <Row noGutters>
        {this.prefecturesFilteredInArea(area).map((prefecture) =>
          <Col sm key={prefecture.id} className="area-select__area">
            <a href={"/" + prefecture.id}>{prefecture.ellipsis_name}</a>
          </Col>
        )}
      </Row>
    )
  }

  withAccordionPrefectures(area) {
    return (
      <>
        <Accordion.Toggle as={Button} className="area-select__region-name" variant="link" eventKey={area}>
          {area}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={area}>
          {this.withOutAccordionPrefectures(area)}
        </Accordion.Collapse>
      </>
    )
  }

  render() {
    const areas = ["関東", "九州・沖縄", "関西", "中部", "北海道・東北", "中国", "四国"]
    return(
      <div className="area-select">
        <Accordion>
          <Row>
            {areas.map((area) =>
              <Col xs={12} sm={4} key={area}>
                <div className="area-select__region">
                  <div className="d-none d-sm-block">
                    {area}
                    {this.withOutAccordionPrefectures(area)}
                  </div>
                  <div className="d-block d-sm-none">
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

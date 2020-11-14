import React from "react"
import PropTypes from "prop-types"

import { Accordion, Button } from "react-bootstrap"

import WithOutAccordionPrefectures from "../WithOutAccordionPrefectures/"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
  area: PropTypes.string.isRequired,
}

export default function WithAccordionPrefectures(props) {
  const { prefectures, area } = props
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
        <WithOutAccordionPrefectures area={area} prefectures={prefectures} />
      </Accordion.Collapse>
    </React.Fragment>
  )
}

WithAccordionPrefectures.propTypes = propTypes

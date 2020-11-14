import React from "react"
import PropTypes from "prop-types"
import PrefectureLink from "components/linkWrapper/prefectureLink"

import { Row, Col } from "react-bootstrap"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
  area: PropTypes.string.isRequired,
}

export default function WithOutAccordionPrefectures(props) {
  const { prefectures, area } = props
  const filteredPrefecturesInArea = prefectures.filter(
    (prefecture) => prefecture.area === area
  )
  return (
    <Row noGutters className="">
      {filteredPrefecturesInArea.map((prefecture) => (
        <Col sm md={2} key={prefecture.name_e} className="area-select__area">
          <span className="pl-3 pl-md-0">
            <PrefectureLink
              prefecture={prefecture}
              classes="f7 area-select__area-name"
            >
              {prefecture.ellipsis_name}
            </PrefectureLink>
          </span>
        </Col>
      ))}
    </Row>
  )
}

WithOutAccordionPrefectures.propTypes = propTypes

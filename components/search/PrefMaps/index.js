import React from "react"
import PropTypes from "prop-types"
import PrefectureLink from "components/linkWrapper/prefectureLink"
import BadgeRender from "./BadgeRender"

const propTypes = {
  prefectures: PropTypes.array.isRequired,
  area: PropTypes.string.isRequired,
  setKeywordAndHandleClose: PropTypes.func.isRequired,
}

export default function Index(props) {
  const { prefectures, area } = props

  const prefecturesFilteredInArea = (area) => {
    if (!prefectures.length) {
      return []
    }
    return prefectures.filter((prefecture) => prefecture.area === area)
  }

  return prefecturesFilteredInArea(area).map((prefecture) => (
    <PrefectureLink
      prefecture={prefecture}
      key={`search-prefecture-${prefecture.name_e}`}
    >
      <BadgeRender
        name={prefecture.ellipsis_name}
        setKeywordAndHandleClose={this.setKeywordAndHandleClose}
      />
    </PrefectureLink>
  ))
}

Index.propTypes = propTypes

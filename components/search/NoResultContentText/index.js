import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  keyword: PropTypes.string.isRequired,
}

export default function Index(props) {
  return (
    <React.Fragment>
      <span className="text-danger">
        「{props.keyword}」を含むお店や地域はありません。
      </span>
      <hr />
    </React.Fragment>
  )
}

Index.propTypes = propTypes

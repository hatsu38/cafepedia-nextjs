import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  name: PropTypes.string.isRequired,
}

export default function Index(props) {
  return <h4 className="f7 original-gray-text mb-1">{props.name}</h4>
}

Index.propTypes = propTypes

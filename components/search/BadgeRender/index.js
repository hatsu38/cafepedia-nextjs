import React from "react"
import PropTypes from "prop-types"
import { Badge } from "react-bootstrap"

const propTypes = {
  name: PropTypes.string.isRequired,
  setKeywordAndHandleClose: PropTypes.func.isRequired,
}

export default function Index(props) {
  return (
    <Badge
      key={`value-${props.name}`}
      className="lighten-15-accent border-lighten-20-accent mr-2"
      onClick={() => props.setKeywordAndHandleClose(props.name)}
    >
      {props.name}
    </Badge>
  )
}

Index.propTypes = propTypes

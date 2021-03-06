import React from "react"
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const propTypes = {
  icon: PropTypes.object.isRequired,
  dtText: PropTypes.string.isRequired,
  ddText: PropTypes.string.isRequired,
}

export default function Index(props) {
  const { icon, dtText, ddText } = props

  return (
    <div className="info-list__item d-flex mr-2">
      <dt>
        <FontAwesomeIcon
          icon={icon}
          className="mr-1 info-list__label"
          width="14"
          height="15"
        />
        <span>{dtText}</span>
      </dt>
      <dd className="info-list__description trancate mb-0">{ddText}</dd>
    </div>
  )
}

Index.propTypes = propTypes

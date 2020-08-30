import React, { Component } from "react"
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const propTypes = {
  icon: PropTypes.object.isRequired,
  dtText: PropTypes.string.isRequired,
  ddText: PropTypes.string.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { icon, dtText, ddText } = this.props

    return (
      <div className="info-list f7 original-gray-text mr-3">
        <div className="info-list__item d-flex">
          <dt className="mr-1">
            <FontAwesomeIcon icon={icon} className="mr-1 info-list__label" />
            {dtText}
          </dt>
          <dd className="info-list__description">{ddText}</dd>
        </div>
      </div>
    )
  }
}

Index.propTypes = propTypes

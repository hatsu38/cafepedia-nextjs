import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  thText: PropTypes.string.isRequired,
  tdText: PropTypes.string.isRequired,
  link: PropTypes.string,
}

export default function Index(props) {
  return (
    <tr>
      <th>{props.thText}</th>
      <td>
        {props.link ? (
          <a href={props.link}>{props.tdText}</a>
        ) : (
          <span>{props.tdText}</span>
        )}
      </td>
    </tr>
  )
}

Index.propTypes = propTypes

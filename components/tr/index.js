import React from "react"
import PropTypes from "prop-types"

const propTypes = {
  thText: PropTypes.string.isRequired,
  tdText: PropTypes.string.isRequired,
  link: PropTypes.string,
}

export default function Index(props) {
  const { thText, tdText, link } = props
  return (
    <tr>
      <th>{thText}</th>
      <td>{link ? <a href={link}>{tdText}</a> : <span>{tdText}</span>}</td>
    </tr>
  )
}

Index.propTypes = propTypes

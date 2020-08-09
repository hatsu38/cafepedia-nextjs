import React, { Component } from 'react'
import { Badge } from "react-bootstrap"

import "./index.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { stations } = this.props

    return (
      <section className="mt-5">
        <h2 className="section--title">人気エリアから探す</h2>
        {stations.map((station, idx) =>
          <Badge className={`station--tag original-gray mr-sm-2 mr-1 mt-sm-3 mt-2 py-1 px-2 ${idx > 14 && "d-none d-sm-inline-block"}`} key={station.id}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1"/>
            {station.kanji_name}
          </Badge>
        )}
      </section>
    )
  }
}

import React, { Component } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row, Col, Badge } from "react-bootstrap"

import {
  faPlug,
  faWifi,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"

// TODO: 電源、Wi-Fiでの検索機能を付ける必要がある
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      socket: true,
      wifi: true,
      smoking: false,
    }
  }

  handleSocket(value) {
    this.setState({ socket: value })
  }

  handleWifi(value) {
    this.setState({ wifi: value })
  }

  render() {
    const { socket, wifi } = this.state
    return (
      <Row className="mb-3">
        <Col xs={6} sm={5} md={3}>
          <Badge
            pill
            className={`py-1 py-md-2 w-100 f7 white-text ${
              socket ? "bg-lighten-5-accent" : "bg-lighten-45-original-gray"
            }`}
          >
            <FontAwesomeIcon icon={faPlug} className="mr-1" />
            {socket ? (
              <React.Fragment>
                電源あり
                <FontAwesomeIcon
                  icon={faTimes}
                  className="ml-3"
                  onClick={() => this.handleSocket(false)}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                電源あり
                <FontAwesomeIcon
                  icon={faCheck}
                  className="ml-3"
                  onClick={() => this.handleSocket(true)}
                />
              </React.Fragment>
            )}
          </Badge>
        </Col>
        <Col xs={6} sm={5} md={3}>
          <Badge
            pill
            className={`py-1 py-md-2 w-100 f7 white-text ${
              wifi ? "bg-lighten-5-accent" : "bg-lighten-45-original-gray"
            }`}
          >
            <FontAwesomeIcon icon={faWifi} className="mr-1" />
            {wifi ? (
              <React.Fragment>
                Wi-Fiあり
                <FontAwesomeIcon
                  icon={faTimes}
                  className="ml-3"
                  onClick={() => this.handleWifi(false)}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                Wi-Fiあり
                <FontAwesomeIcon
                  icon={faCheck}
                  className="ml-3"
                  onClick={() => this.handleWifi(true)}
                />
              </React.Fragment>
            )}
          </Badge>
        </Col>
      </Row>
    )
  }
}

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Row, Col, Badge } from "react-bootstrap"

import {
  faPlug,
  faWifi,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons"

export default function Index() {
  const [socket, setSocket] = useState(true)
  const [wifi, setWifi] = useState(true)

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
                onClick={() => setSocket(false)}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              電源あり
              <FontAwesomeIcon
                icon={faCheck}
                className="ml-3"
                onClick={() => setSocket(true)}
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
                onClick={() => setWifi(false)}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              Wi-Fiあり
              <FontAwesomeIcon
                icon={faCheck}
                className="ml-3"
                onClick={() => setWifi(true)}
              />
            </React.Fragment>
          )}
        </Badge>
      </Col>
    </Row>
  )
}

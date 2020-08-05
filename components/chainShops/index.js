import React, { Component } from 'react'
import { Image, Row, Col, Card } from "react-bootstrap"
export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {chainShops} = this.props
    return (
      <Row noGutters>
        {chainShops.map((chainShop) =>
          <Col xs={6} md={4} lg={3} key={chainShop.id} className="mt-3">
            <Card className="h-100">
              <Card.Img variant="top" src={"https://cafepedia-images.s3-ap-northeast-1.amazonaws.com" + chainShop.image} />
              <Card.Body className="py-2">
                <Card.Title className="f6">{chainShop.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    )
  }
}

import React, { Component } from 'react'
import { Row, Col, Card } from "react-bootstrap"
export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {chainShops} = this.props
    return (
      <section className="mt-5">
        <h2 className="section--title">人気チェーン店から探す</h2>
        <Row noGutters>
          {chainShops.map((chainShop) =>
            <Col xs={6} sm={3} lg key={chainShop.id} className="mt-3">
              <Card className="h-100 mx-2 mx-lg-1">
                <Card.Img variant="top" className={`bg-${chainShop.eng_name}`} src={"https://cafepedia-images.s3-ap-northeast-1.amazonaws.com" + chainShop.image} />
                <Card.Body className="py-1 px-1 border-top">
                  <Card.Title className="f7 mb-0 text-center">{chainShop.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </section>
    )
  }
}

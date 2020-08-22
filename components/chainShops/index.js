import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Link from 'next/link'

import { Row, Col, Card } from "react-bootstrap"

const propTypes = {
  chainShops: PropTypes.array.isRequired,
}

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
              <Link href="/chain_shops/[id]" as={`/chain_shops/${chainShop.id}`}>
                <a>
                  <Card className="h-100 mx-2 mx-lg-1">
                    <Card.Img variant="top" className={`bg-${chainShop.eng_name}`} src={process.env.s3Host + chainShop.image} />
                    <Card.Body className="py-1 px-1 border-top">
                      <Card.Title className="f7 mb-0 text-center">{chainShop.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </a>
              </Link>
            </Col>
          )}
        </Row>
      </section>
    )
  }
}

Index.propTypes = propTypes

import React, { Component } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { Row, Col, Card } from "react-bootstrap"

const propTypes = {
  chainShops: PropTypes.array.isRequired,
}

export default class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { chainShops } = this.props
    return (
      <section className="mt-5">
        <h2 className="section--title">人気チェーン店から探す</h2>
        <Row noGutters>
          {chainShops.slice(0, 8).map((chainShop) => (
            <Col xs={6} sm={3} lg key={chainShop.eng_name} className="mt-3">
              <Card className="h-100 mx-2 mx-lg-1">
                <Link
                  href="/[chain_shop_eng_name]"
                  as={`/${chainShop.eng_name}`}
                >
                  <a href={`/${chainShop.eng_name}`}>
                    <Card.Img
                      variant="top"
                      className={`bg-${chainShop.eng_name}`}
                      src={process.env.s3Host + chainShop.image}
                    />
                    <Card.Body className="py-1 px-1 border-top">
                      <Card.Title className="f7 mb-0 text-center">
                        {chainShop.name}
                      </Card.Title>
                    </Card.Body>
                  </a>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    )
  }
}

Index.propTypes = propTypes

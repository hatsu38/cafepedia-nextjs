import React from "react"
import PropTypes from "prop-types"
import { Jumbotron, Container, Button } from "react-bootstrap"
import LinkWithATag from "components/linkWrapper/linkWithATag"
import Layout from "components/layout"

const propTypes = {
  statusCode: PropTypes.number.isRequired,
}

export default function Index({ statusCode }) {
  return (
    <Layout>
      <Jumbotron fluid className="bg--white">
        <Container>
          <h1 className="original-gray f2 text-center">
            {statusCode} - 現在サーバーが込み合っています
          </h1>
          <div className="text-center mt-5">
            <LinkWithATag href="/" as="/" classes="text-center">
              <Button variant="outline-secondary">Topページにもどる</Button>
            </LinkWithATag>
          </div>
        </Container>
      </Jumbotron>
    </Layout>
  )
}

Index.propTypes = propTypes

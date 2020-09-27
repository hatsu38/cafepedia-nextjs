import React from "react"
import PropTypes from "prop-types"
import { Jumbotron, Container, Button } from "react-bootstrap"
import LinkWithATag from "components/linkWrapper/linkWithATag"

const propTypes = {
  statusCode: PropTypes.number.isRequired,
}

export default function Index({ statusCode }) {
  return (
    <Jumbotron fluid className="bg--white">
      <Container>
        <h1 className="original-gray f3">
          {statusCode} - 現在サーバーが込み合っています
        </h1>
        <div className="text-center mt-5">
          <LinkWithATag href="/" as="/" classes="text-center">
            <Button className="bg-lighten-20-original-gray">
              Topページにもどる
            </Button>
          </LinkWithATag>
        </div>
      </Container>
    </Jumbotron>
  )
}

Index.propTypes = propTypes

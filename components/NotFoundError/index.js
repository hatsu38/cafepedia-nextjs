import React from "react"
import { Jumbotron, Container, Button } from "react-bootstrap"
import LinkWithATag from "components/linkWrapper/linkWithATag"

export default function Index() {
  return (
    <Jumbotron fluid className="bg--white">
      <Container>
        <h1 className="original-gray f3">
          404 - お探しのページが見つかりません
        </h1>
        <p className="lighten-10-accent font-bold mt-2 f6">
          このページはすでに削除されたか、URLが変更されているため表示できません
        </p>
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

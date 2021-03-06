import React from "react"
import { NextSeo } from "next-seo"
import { Jumbotron, Container, Button } from "react-bootstrap"
import LinkWithATag from "components/linkWrapper/linkWithATag"
import Layout from "components/layout"

export default function Index() {
  return (
    <Layout>
      <NextSeo noindex="true" nofollow="true" />
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
              <Button variant="outline-secondary">Topページにもどる</Button>
            </LinkWithATag>
          </div>
        </Container>
      </Jumbotron>
    </Layout>
  )
}

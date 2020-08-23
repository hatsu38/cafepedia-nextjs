import React from "react"
import { Navbar, Container } from "react-bootstrap"

import "./header.module.scss"

export default function Header() {
  return (
    <Container>
      <Navbar bg="transparent" style={{ zIinndex: "1" }} className="p-0">
        <Navbar.Brand href="/" className="f4 font-wight--700 accent-text">
          カフェペディア
        </Navbar.Brand>
      </Navbar>
    </Container>
  )
}

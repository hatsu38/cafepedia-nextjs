import React from 'react'
import { Navbar } from "react-bootstrap"

import './header.module.scss'

export default function Header() {
  return (
    <Navbar bg="transparent" className="position-absolute" style={{zIndex: "1"}}>
      <Navbar.Brand href="/" className="f4 font-wight--700 white-text">カフェペディア</Navbar.Brand>
    </Navbar>
  )
}

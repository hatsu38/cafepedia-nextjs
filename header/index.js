import React from 'react'
import { Navbar } from "react-bootstrap"

import './header.module.scss'

export default function Header() {
  return (
    <Navbar bg="red">
      <Navbar.Brand href="/" className="f6 font-wight--600">カフェペディア</Navbar.Brand>
    </Navbar>
  )
}

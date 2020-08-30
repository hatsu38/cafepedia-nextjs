import React from "react"
import { Navbar, Container } from "react-bootstrap"
import { useRouter } from "next/router"
import "./header.module.scss"

export default function Header() {
  let style = {
    header: "global-header__border",
    headerSubClass: "except_top",
  }
  console.log("style", style)
  const router = useRouter()
  if (router.pathname === "/") {
    style.header = ""
    style.headerSubClass = "top"
  }
  return (
    <header className={`pb-1 mt-1 mb-4 ${style.header}`}>
      <Container>
        <Navbar bg="transport" style={{ zIndex: "1" }} className="p-0">
          <Navbar.Brand href="/">
            <img
              src="/images/site-icon.png"
              alt="cafepedia logo"
              width="28"
              height="28"
              className="d-inline-block align-top align-middle"
            />
            <span className="accent-text f4 font-wight--700 align-middle">
              カフェペディア
            </span>
            <span
              className={`f7 ml-1 global-header__sub align-middle ${style.headerSubClass}`}
            >
              電源とWi-Fiのあるカフェがすぐに見つかる
            </span>
          </Navbar.Brand>
        </Navbar>
      </Container>
    </header>
  )
}

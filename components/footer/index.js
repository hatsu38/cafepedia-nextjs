import React from "react"
import { Navbar, Container } from "react-bootstrap"
import { useRouter } from "next/router"

export default function Header() {
  const router = useRouter()
  let style = {
    header: "global-header__border",
    headerSubClass: "except_top",
  }
  if (router.pathname === "/") {
    style.header = ""
    style.headerSubClass = "top"
  }
  return (
    <footer className="f6 bg-lighten-15-original-gray white-text mt-5">
      <div className="text-center py-3">© 2020 Copyright:
        <a href="https://cafepedia.jp/" className="white-text"> cafepedia.jp</a>
      </div>
    </footer>
  )
}

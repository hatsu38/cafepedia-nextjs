import '../stylesheets/layout.module.scss'
import Header from '../header/index'
import { Container } from "react-bootstrap"

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}


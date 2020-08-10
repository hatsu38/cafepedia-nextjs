import '../stylesheets/layout.module.scss'
import Header from '../header/index'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}


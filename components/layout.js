import '../stylesheets/layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className="container">
      {children}
    </div>
  )
}


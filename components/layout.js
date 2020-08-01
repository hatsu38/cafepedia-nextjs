import styles from '../stylesheets/layout.module.css'


export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <h1>カフェペディア</h1>
      {children}
    </div>
  )
}


import styles from '../stylesheets/layout.module.css'


export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  )
}


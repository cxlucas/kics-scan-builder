import styles from './box.module.css'

const Box = ({ title, children }) => {
  return (
    <div className={styles.boxContainer}>
      {title && <span className={styles.boxTitle}>{title}</span>}
      <div className={styles.boxDiv}>{children}</div>
    </div>
  )
}

export default Box

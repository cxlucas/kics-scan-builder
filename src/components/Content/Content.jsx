import { Layout } from 'antd'
import styles from './content.module.css'

const { Content } = Layout

const AppContent = ({ children }) => {
  return (
    <>
      <Content className={styles.content}>{children}</Content>
    </>
  )
}

export default AppContent

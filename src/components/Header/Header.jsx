import { Layout } from 'antd'
import styles from './header.module.css'
import logo from '../../assets/logo.png'

const { Header } = Layout

const AppHeader = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.headerDiv}>
        <img src={logo} className="App-logo" alt="logo" style={{ maxHeight: '48px' }} />
        <span className={styles.title}>Kics Scan Builder</span>
      </div>
    </Header>
  )
}

export default AppHeader

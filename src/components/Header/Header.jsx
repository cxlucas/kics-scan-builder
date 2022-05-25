import { Layout } from 'antd'
import styles from './header.module.css'
import logo from '../../assets/logo.png'
import { GithubOutlined } from '@ant-design/icons'

const { Header } = Layout

const AppHeader = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.headerDiv}>
        <img src={logo} alt="logo" className={styles.appLogo} />
        <span className={styles.title}>Kics Scan Builder</span>
      </div>
      <a
        href="https://github.com/cxlucas/kics-scan-builder"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.headerDiv}>
        <GithubOutlined className={styles.githubIcon} />
      </a>
    </Header>
  )
}

export default AppHeader

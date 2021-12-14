import { Button, Tooltip, Input as AntInput } from 'antd'
import styles from './input.module.css'
import { InfoCircleOutlined } from '@ant-design/icons'

const Input = ({ label, placeholder, description }) => {
  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputContainer}>
        <label>{label}: </label>
        <AntInput placeholder={placeholder} style={{ width: '80%' }} />
        <Tooltip title="More Info">
          <Button
            type="text"
            shape="circle"
            size="large"
            icon={<InfoCircleOutlined style={{ color: 'blue' }} />}
          />
        </Tooltip>
      </div>
      <div className={styles.inputDescriptionDiv}>
        <span className={styles.inputDescriptionText}>{description}</span>
      </div>
    </div>
  )
}

export default Input

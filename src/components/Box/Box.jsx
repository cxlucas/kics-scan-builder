import styles from './box.module.css'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Popover, Button } from 'antd'

const Box = ({ title, children, tooltip }) => {
  return (
    <div className={styles.boxContainer}>
      <div className={styles.titleContainer}>
        {title && <span className={styles.boxTitle}>{title}</span>}
        {tooltip && (
          <Popover
            content={tooltip}
            title={title}
            trigger="hover"
            className={styles.popOver}
            placement={'right'}
            overlayInnerStyle={{ maxWidth: '400px' }}>
            <Button
              type="text"
              shape="circle"
              size="large"
              icon={<InfoCircleOutlined style={{ color: 'blue' }} />}
            />
          </Popover>
        )}
      </div>
      <div className={styles.boxDiv}>{children}</div>
    </div>
  )
}

export default Box

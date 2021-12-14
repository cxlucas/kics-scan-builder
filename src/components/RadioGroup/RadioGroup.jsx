import { Radio } from 'antd'
import { useState } from 'react'
import styles from './radiogroup.module.css'
import Box from '../Box/Box'

const RadioGroup = ({ items, defaultIndex = 0 }) => {
  const [value, setValue] = useState(items[defaultIndex].value)

  const expandItem = items.filter((item) => item.value === value && item.children)

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }

  return (
    <>
      <Radio.Group onChange={onChange} value={value}>
        {items.map((item) => (
          <Radio key={item.value} value={item.value}>
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
      {expandItem.length > 0 && (
        <div className={styles.childrenGroup}>
          <Box>{expandItem[0].children}</Box>
        </div>
      )}
    </>
  )
}

export default RadioGroup

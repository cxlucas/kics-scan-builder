import { MainContext } from '../../context/MainContext'
import { useContext, useState } from 'react'
import { Radio } from 'antd'
import styles from './radiogroup.module.css'
import Box from '../Box/Box'

const RadioGroup = ({ flag, items, defaultIndex = 0 }) => {
  const { state, dispatch } = useContext(MainContext)

  const itemUniqueID = (flag, flagAux) => `${flag}-${flagAux}`

  const contextValue = state.data.filter((item) => item.flag === flag)[0]

  const [value, setValue] = useState(
    contextValue
      ? itemUniqueID(contextValue.flag, contextValue.flagAux)
      : itemUniqueID(items[defaultIndex].flag, items[defaultIndex].flagAux)
  )

  const expandItem = items.filter(
    (item) => itemUniqueID(item.flag, item.flagAux) === value && item.children
  )

  const onChange = (e) => {
    setValue(e.target.value)
    const item = items.filter((item) => itemUniqueID(item.flag, item.flagAux) === e.target.value)[0]
    if (item) {
      dispatch({
        type: 'ADD',
        data: {
          flag: item.flag,
          value: item?.value || '',
          flagAux: item.flagAux,
          required: item?.required
        }
      })
    }
  }

  return (
    <>
      <Radio.Group onChange={onChange} value={value}>
        {items.map((item) => (
          <Radio
            key={itemUniqueID(item.flag, item.flagAux)}
            value={itemUniqueID(item.flag, item.flagAux)}>
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

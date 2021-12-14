import { Select, Button, Tooltip } from 'antd'
import styles from './selectmult.module.css'
import { InfoCircleOutlined } from '@ant-design/icons'
import { MainContext } from '../../context/MainContext'
import { useContext } from 'react'

const SelectMult = ({ flag, flagAux, label, placeholder, description, defaultValue = [] }) => {
  const { state, dispatch } = useContext(MainContext)

  const onChange = (selectionList) => {
    dispatch({ type: 'ADD', data: { flag: flag, value: selectionList, flagAux: flagAux } })
  }

  const defaultContext = state.data.filter(
    (item) => item.flag === flag && item.flagAux === item.flagAux
  )[0]

  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputContainer}>
        <label>{label}: </label>
        <Select
          mode="tags"
          style={{ width: '80%' }}
          placeholder={placeholder}
          defaultValue={
            defaultContext && defaultContext?.value ? defaultContext.value : defaultValue
          }
          onChange={onChange}></Select>
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

export default SelectMult

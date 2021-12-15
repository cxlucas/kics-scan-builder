import { Button, Tooltip, Input as AntInput } from 'antd'
import styles from './input.module.css'
import { InfoCircleOutlined } from '@ant-design/icons'
import { MainContext } from '../../context/MainContext'
import { useContext } from 'react'

const Input = ({
  flag,
  flagAux,
  label,
  placeholder,
  description,
  defaultValue = '',
  required = false
}) => {
  const { state, dispatch } = useContext(MainContext)
  const defaultContext = state.data.filter(
    (item) => item.flag === flag && item.flagAux === item.flagAux
  )[0]

  const onChange = (e) => {
    dispatch({
      type: 'ADD',
      data: { flag: flag, value: e.target.value, flagAux: flagAux, required: required }
    })
  }

  return (
    <div className={styles.inputDiv}>
      <div className={styles.inputContainer}>
        <label>{label}: </label>
        <AntInput
          placeholder={placeholder}
          style={{ width: '80%' }}
          onChange={onChange}
          defaultValue={
            defaultContext && defaultContext?.value ? defaultContext.value : defaultValue
          }
        />
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

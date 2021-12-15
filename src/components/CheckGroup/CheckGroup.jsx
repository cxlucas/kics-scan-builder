import { MainContext } from '../../context/MainContext'
import { useContext } from 'react'
import { Checkbox } from 'antd'
//import styles from './checkgroup.module.css'

const CheckGroup = ({ flag, items, defaultSelection = [], required = false }) => {
  const { state, dispatch } = useContext(MainContext)

  const contextValue = state.data.filter((item) => item.flag === flag)[0]

  const onChange = (checkedValues) => {
    dispatch({
      type: 'ADD',
      data: { flag: flag, value: checkedValues, flagAux: null, required: required }
    })
  }

  return (
    <>
      <Checkbox.Group
        options={items}
        defaultValue={contextValue ? contextValue.value : defaultSelection}
        onChange={onChange}
      />
    </>
  )
}

export default CheckGroup

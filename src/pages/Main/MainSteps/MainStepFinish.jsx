import { MainContext } from '../../../context/MainContext'
import { useContext } from 'react'

const MainStepFinish = () => {
  const { state } = useContext(MainContext)

  return (
    <div style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', gap: '1em' }}>
      Generated Output (Flags):
      {state.data.length > 0 &&
        state.data.map((item) => (
          <div key={item.flag}>
            <b>{item.flag}</b>: {item.value} <i>{item.flagAux && `(${item.flagAux})`}</i>
          </div>
        ))}
    </div>
  )
}

export default MainStepFinish

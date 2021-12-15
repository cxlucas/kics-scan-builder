import { createContext } from 'react'

export const initialState = {
  data: [
    { flag: 'source', value: '', flagAux: 'local', required: true },
    { flag: 'path', value: '', flagAux: 'local', required: true },
    { flag: 'queries-path', value: '', flagAux: 'default', required: true },
  ]
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const updatedData = state.data.filter((item) => item.flag !== action.data.flag)
      updatedData.push(action.data)

      return {
        ...state,
        data: updatedData
      }
    }
    default:
      return state
  }
}

export const MainContext = createContext({
  state: initialState,
  dispatch: () => null
})

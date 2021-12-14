import { createContext } from 'react'

export const initialState = {
  data: [
    { flag: 'source', value: '', flagAux: 'local' },
    { flag: 'path', value: '', flagAux: 'local' },
    { flag: 'queries-path', value: '', flagAux: 'default' },
    { flag: 'minimal-ui', value: '', flagAux: 'disable' },
    { flag: 'no-progress', value: '', flagAux: 'disable' },
    { flag: 'no-color', value: '', flagAux: 'disable' },
    { flag: 'custom', value: '', flagAux: 'default' }
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

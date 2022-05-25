import { useReducer } from 'react'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import Main from './pages/Main/Main'
import { reducer, MainContext, initialState } from './context/MainContext'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div>
      <Header />
      <Content>
        <MainContext.Provider value={{ state, dispatch }}>
          <Main />
        </MainContext.Provider>
      </Content>
    </div>
  )
}

export default App

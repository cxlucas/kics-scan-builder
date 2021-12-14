import './App.css'
import { useState, useReducer } from 'react'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import Main from './pages/Main/Main'
import { reducer, MainContext, initialState } from './context/MainContext'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content>
        <MainContext.Provider value={{ state, dispatch }}>
          <Main />
        </MainContext.Provider>
      </Content>
    </div>
  )
}

export default App

import './App.css'
import { useState } from 'react'
import Header from './components/Header/Header'
import Content from './components/Content/Content'
import Main from './pages/Main/Main'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Content>
        <Main />
      </Content>
    </div>
  )
}

export default App

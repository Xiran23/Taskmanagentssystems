

import './App.css'
import { Header } from './components'
import { BrowserRouter as Router } from 'react-router-dom'
import { AllRoutes } from './routes/AllRoutes'


function App() {
  

  return (
    
    <>

    <Router>

      <Header></Header>
       <AllRoutes></AllRoutes>
    </Router>
    </>
  )
}

export default App

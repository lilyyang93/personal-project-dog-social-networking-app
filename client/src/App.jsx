import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="" element={<LogInPage />}> </Route>
        <Route path="signup" element={<SignUpPage />}></Route>
        <Route path="homepage" element={<HomePage />}></Route>
      </Routes>
    </div>
    </Router>
  )
}

export default App

import {HashRouter as Router, Routes, Route} from 'react-router-dom'
import SignUpPage from './SignUpPage'
import LogInPage from './LogInPage'
//import axios from 'axios'

export default function IndexPage() {

    return (
    <div className="IndexPage">
        <h1>Welcome to Fetch</h1><hr/>
        <a href="/#/login">Log In</a>
        <br/><br/>
        <a href="/#/signup">Sign Up</a>
        <Router>
            <Routes>
                <Route path="signup" element={<SignUpPage />}></Route>
                <Route path="login" element={<LogInPage />}></Route>
            </Routes>
        </Router>
    </div>
    )
}
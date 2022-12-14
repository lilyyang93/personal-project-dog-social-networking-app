import axios from 'axios'
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function LogInPage() {
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');
    axios.defaults.headers.common['X-CSRFToken'] = csrftoken
    
    const [loggedIn, setLoggedIn] = useState(false)

    async function authenticateUser(event) {
        event.preventDefault()
        let email = document.getElementById('LogInEmail').value
        let password = document.getElementById('LogInPassword').value
        
        let response = await axios.post("", {
            'email': email,
            'password': password,
        })
        if (response.data.success) {
            setLoggedIn(true)
        }
    }

    if (loggedIn) {
        return <Navigate to="/homepage"/>
    }

    return (
        <div className="LogInPage">
        <h1>Welcome to Fetch!</h1><br/><br/>
        <h5>Please log in</h5><br/>
        <form onSubmit={authenticateUser}>
            <label for="LogInEmail">email: </label><input id="LogInEmail" type="text" /><br/><br/>
            <label for="LogInPassword">password: </label><input id="LogInPassword" type="password" /><br/><br/>
            <input type="submit"></input>
        </form><br/>
        <p>Don't have an account?</p> <Link to="/signup">Sign Up!</Link>
        </div>
    )
}
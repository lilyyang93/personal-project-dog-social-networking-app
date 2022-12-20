import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUpPage() {
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

    const [newUser, setNewUser] = useState(false)
    
    async function createUser(event) {
        event.preventDefault()
        let username = document.getElementById('SignUpUsername').value
        let email = document.getElementById('SignUpUsername').value
        let password = document.getElementById('SignUpPassword').value
        let birthdate = document.getElementById('SignUpBirthdate').value
        let first_name = document.getElementById('SignUpFirstname').value
        let last_name = document.getElementById('SignUpLastname').value
        let city = document.getElementById('SignUpCity').value
        
        let response = await axios.post("signup", {
            'first_name': first_name,
            'last_name': last_name,
            'email': email,
            'username': username,
            'password': password,
            'birthdate': birthdate,
            'city': city,
            'image': "",
        })
        if (response.data.success) {
            setNewUser(true)
        }
    }

    if (newUser) {
        return <Navigate to="/" />
    }

    return (
        <div className="SignUpPage">
        <h1>Sign up!</h1>
        <form method="post" onSubmit={createUser}>
            <label for="SignUpFirstname">first name: </label><input id="SignUpFirstname" type="text" /><br/><br/>
            <label for="SignUpLastname">last name: </label><input id="SignUpLastname" type="text" /><br/><br/>
            <label for="SignUpUsername">email: </label><input id="SignUpUsername" type="text" /><br/><br/>
            <label for="SignUpPassword">password: </label><input id="SignUpPassword" type="password" /><br/><br/>
            <label for="SignUpBirthdate">date of birth: </label><input id="SignUpBirthdate" type="text" placeholder="YYYY-MM-DD" /><br/><br/>
            <label for="SignUpCity">city: </label><input id="SignUpCity" type="text" /><br/><br/>
            <input type="submit"></input>
        </form>
        </div>
    )
}
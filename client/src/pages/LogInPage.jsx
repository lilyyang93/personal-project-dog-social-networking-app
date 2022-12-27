import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';

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
    const [dogPhoto, setDogPhoto] = useState("")

    useEffect(()=>{
        getLogin()
    },[])

    async function getLogin() {
        let response = await axios.get("login")
        setDogPhoto(response.data.dog_image)
    }
 
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
        <MDBContainer fluid>
            <MDBRow>
                <MDBCol sm='6'>
                <div className='d-flex flex-row ps-5 pt-5'>
                </div>
                <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>
                    <h1 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Welcome to Fetch!</h1>
                    <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='LogInEmail' type='email' size="lg"/>
                    <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='LogInPassword' type='password' size="lg"/>
                    <MDBBtn onClick={authenticateUser} className="mb-4 px-5 mx-5 w-100"  size='lg'>Login</MDBBtn>
                    <p className='ms-5'>Don't have an account? <Link class="link-info" to="/signup">Sign Up!</Link></p>
                </div>
                </MDBCol>
                <MDBCol sm='6' className='d-none d-sm-block px-0'>
                <img src={dogPhoto}
                // "https://mdbootstrap.com/img/Photos/Vertical/mountain2.webp"
                    alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </div>
    )
}
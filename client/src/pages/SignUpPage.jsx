import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';

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
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{color: '#4835d4'}}>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5'>
                <MDBInput wrapperClass='mb-4' label='first name' size='lg' id='SignUpFirstname' type='text'/>
                <MDBInput wrapperClass='mb-4' label='last name' size='lg' id='SignUpLastname' type='text'/>
                <MDBInput wrapperClass='mb-4' label='email' size='lg' id='SignUpUsername' type='email'/>
                <MDBInput wrapperClass='mb-4' label='password' size='lg' id='SignUpPassword' type='password'/>
                <MDBInput wrapperClass='mb-4' label='birthdate (YYYY-MM-DD)' size='lg' id='SignUpBirthdate' type='text'/>
                <MDBInput wrapperClass='mb-4' label='city' size='lg' id='SignUpCity' type='text'/>
                <MDBBtn onClick={createUser} className='mb-4 w-100 gradient-custom-4' size='lg'>sign up!</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
        </div>
    )
}
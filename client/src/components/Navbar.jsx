import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const [userLoggedIn, setUserLoggedIn] = useState(true)
    const navigate = useNavigate()

    async function logoutUser() {
        let response = await axios.post("logout")
        if (response.data.success) {
            console.log('user successfully logged out')
            setUserLoggedIn(false)
        }
    }

    useEffect(()=> {
        if (!userLoggedIn) {
            navigate("/")
        }
    },[userLoggedIn])

    return (
    <div className="NavBar">
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Fetch</Navbar.Brand>
        <Nav className="me-auto">
        <Nav.Link href="">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link onClick={logoutUser}>Log Out</Nav.Link>
        </Nav>
    </Navbar>
    </div>
    );
}
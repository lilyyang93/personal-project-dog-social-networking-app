import axios from "axios"
import NavBar from "../components/Navbar"
import { useState, useEffect } from "react"

export default function HomePage() {

    const [myUser, setMyUser] = useState(null)

    useEffect(()=> {
        getUserPage()
    },[])

    async function getUserPage() {
        let response = await axios.get("homepage")
        setMyUser(response.data.user)
    }   

    return (
        <div className="homepage">
            <NavBar />
            <h1>Welcome to your homepage, {myUser}</h1>
        </div>
    )
}
import axios from "axios"
import NavBar from "../components/Navbar"
import { useEffect } from "react"

export default function HomePage() {

    useEffect(()=> {
        getUserPage
    },[])


    async function getUserPage() {
        let response = await axios.get("homepage")
    }    

    return (
        <div className="homepage">
            <NavBar />
            <h1> welcome to your homepage </h1>
        </div>
    )
}
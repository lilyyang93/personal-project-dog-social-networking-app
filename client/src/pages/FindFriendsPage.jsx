import axios from 'axios'
import NavBar from "../components/Navbar"
import { useEffect } from 'react'

export default function FindFriendsPage() {
    useEffect(()=>{
        hello()
    },[])

    async function hello() {
        let response = await axios.get("findfriends")
        console.log(response.data)
    }  
    return (
        <div className="FindFriendsPage">
            <NavBar /><br/>
            <h3>fetching friends in your area...</h3>
        </div>
    )
}
import axios from 'axios'
import NavBar from "../components/Navbar"
import { useEffect, useState } from 'react'

export default function FindFriendsPage() {

    const [friends, setFriends] = useState([])
    const [dogPhoto, setDogPhoto] = useState("")

    useEffect(()=>{
        getFriends()
    },[])

    async function getFriends() {
        let response = await axios.get("findfriends")
        setFriends(response.data.friends)
        setDogPhoto(response.data.dog_image)
    }  

    return (
        <div className="FindFriendsPage">
            <NavBar /><br/>
            <h3>fetching friends in your area...</h3><br/><br/>
            {friends.length == 0 ? 
            <h5>No friends found. Please try again later.</h5> : 
            friends.map((friend)=> {
                <h3>{friend}</h3>
            })}
            {friends.length == 0 ? <img src={dogPhoto}/> : <p></p>}
        </div>
    )
}
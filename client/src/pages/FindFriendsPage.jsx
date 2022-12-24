import axios from 'axios'
import NavBar from "../components/Navbar"
import { useEffect, useState } from 'react'

export default function FindFriendsPage() {

    const [friends, setFriends] = useState([])
    const [dogPhoto, setDogPhoto] = useState("")
    const [availableFriends, setAvailableFriends] = useState(true)

    useEffect(()=>{
        getFriends()
    },[])

    useEffect(()=>{
        friends.map((friend)=>{
            console.log(friend.fields.name)
        })
    },[friends])

    async function getFriends() {
        let response = await axios.get("findfriends")
        setFriends(response.data.friends)
        setDogPhoto(response.data.dog_image)
        if (friends.length == 0) {
            setAvailableFriends(false)
        } 
    }  

    return (
        <div className="FindFriendsPage">
            <NavBar /><br/>
            <h3>fetching friends in your area...</h3><br/><br/>
            {availableFriends ? <p></p> : <p>no friends found. please try again later.</p>}
            {availableFriends ? <p></p> : <img src={dogPhoto}/>}
        </div>
    )
}

import axios from 'axios'
import NavBar from "../components/Navbar"
import { useEffect, useState } from 'react'
import FriendTeaser from '../components/FriendTeaser'

export default function FindFriendsPage() {

    const [friends, setFriends] = useState([])
    const [dogPhoto, setDogPhoto] = useState("")
    const [availableFriends, setAvailableFriends] = useState(true)
    const [friendNames, setFriendNames] = useState([])


    useEffect(()=>{
        getFriends()
    },[])

    useEffect(()=>{
        friends.map((friend)=>{
            setFriendNames(prevArray => [...prevArray, friend.fields.name])
        })
        if (!friendNames) {
            setAvailableFriends(false)
        }
    },[friends])

    async function getFriends() {
        let response = await axios.get("findfriends")
        setFriends(response.data.friends)
        setDogPhoto(response.data.dog_image)
    }  

    return (
        <div className="FindFriendsPage">
            <NavBar /><br/>
            <h3>fetching friends in your area...</h3><br/><br/>
            {availableFriends ? <FriendTeaser friendNames={friendNames}/> : <p>no friends found. please try again later</p>}
            {availableFriends ? <p></p> : <img src={dogPhoto}/>}
        </div>
    )
}
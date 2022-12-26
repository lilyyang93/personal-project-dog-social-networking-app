import axios from 'axios'
import NavBar from "../components/Navbar"
import { useEffect, useState } from 'react'
import FriendTeaser from '../components/FriendTeaser'

export default function FindFriendsPage() {

    const [responseData, setResponseData] = useState([])
    const [friends, setFriends] = useState([])
    const [dogPhoto, setDogPhoto] = useState("")
    const [availableFriends, setAvailableFriends] = useState(true)

    useEffect(()=>{
        getFriends()
    },[])

    async function getFriends() {
        let response = await axios.get("findfriends")
        setResponseData(response.data.friends)
        setDogPhoto(response.data.dog_image)
    } 

    useEffect(()=>{
        setFriends(responseData.map((friend)=>{
            return {
                id: friend.pk,
                owner: friend.fields.user_pet,
                name: friend.fields.name,
                birthdate: friend.fields.birthdate,
                breed: friend.fields.breed, 
                gender: friend.fields.gender,
                spayed_neutered_status: friend.fields.spayed_neutered, 
                profile_image: friend.fields.profile_image,
                city: friend.fields.city,
                personality: friend.fields.personality,
                likes: friend.fields.likes
            }
        }))
    },[responseData]) 

    useEffect(()=>{
        if (!friends) {
            setAvailableFriends(false)
        }
    },[friends])

    return (
        <div className="FindFriendsPage">
            <NavBar /><br/>
            <h3>fetching friends in your area...</h3><br/><br/>
            {availableFriends ? <FriendTeaser friends={friends}/> : <p>no friends found. please try again later</p>}
            {availableFriends ? <p></p> : <img src={dogPhoto}/>}
        </div>
    )
}
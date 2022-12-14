import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar"
import axios from "axios"
import Button from 'react-bootstrap/Button'

export default function ViewFriendProfilePage(){
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

    const navigate = useNavigate()
    const [myFriend, setMyFriend] = useState([])

    let { petID } = useParams()

    useEffect(()=>{
        viewFriend()
    },[])

    async function viewFriend() {
        let response = await axios.get("", {params:{"petID":petID}})
        setMyFriend(response.data)
    }

    return (
        <div className="ViewFriendProfilePage">
            <NavBar /><br/>
            <h2>{myFriend.name}</h2>
            <Button variant="primary" onClick={()=>navigate(`/sendmessage${petID}`)}>send message</Button>
            {/* <Button variant="primary" onClick={()=>navigate(`/viewfriend${friend.id}`)}>add to favorite</Button> */}
            <hr/>
            <p>DOB: {myFriend.birthdate}</p>
            <p>{myFriend.gender} {myFriend.breed}</p>
            <p>spayed/neutered: {myFriend.spayed_neutered}</p>
            <br/><br/><br/>
            <h4>{myFriend.name}'s personality:</h4>
            <p>{myFriend.personality}</p>
            <br/><br/><br/>
            <h4>{myFriend.name} likes: </h4>
            <p>{myFriend.likes}</p>
            {/* <p>{myFriend.profile_image}</p> */}
        </div>
    )
}
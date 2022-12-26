import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar"
import axios from "axios"

export default function SendMessagePage() {
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

    const [myFriend, setMyFriend] = useState([])

    let { petID } = useParams()

    useEffect(()=>{
        getPage()
    },[])

    async function getPage() {
        let response = await axios.get("", {params:{"petID":petID}})
        setMyFriend(response.data)
    }

    useEffect(()=>{
        console.log(myFriend)
    },[myFriend])

    return (
        <div className="SendMessagePage">
            <NavBar /><br/>
            <h3>send a message to {myFriend.name}</h3>
        </div>
    )
}
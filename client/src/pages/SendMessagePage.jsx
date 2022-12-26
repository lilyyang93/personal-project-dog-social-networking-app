import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar"
import axios from "axios"
import { MDBTextArea } from 'mdb-react-ui-kit';
import { MDBInput } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button'

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
    const [sentMessage, setSentMessage] = useState(false)
    const [friendID, setFriendID] = useState("")

    let { petID } = useParams()

    useEffect(()=>{
        getPage()
    },[])

    useEffect(()=>{
        console.log(friendID)
    },[friendID])

    async function getPage() {
        let response = await axios.get("", {params:{"petID":petID}})
        setMyFriend(response.data)
        setFriendID(petID)
        console.log(response.data.name)
    }

    async function sendMessage() {
        let title = document.getElementById("title").value
        let message = document.getElementById("message").value

        let response = await axios.post("", {
            'petID': friendID,
            'title': title,
            'message': message
        })

        if (response.data.success) {
            setSentMessage(true)
        }
    }

    return (
        <div className="SendMessagePage">
            <NavBar /><br/>
            <h3>send a message to {myFriend.name}</h3>
            <MDBInput label="title" id='title' type='text' /><br/>
            <MDBTextArea label="send your message!" id='message' rows={4} />
            <br/> 
            <Button variant="primary" onClick={()=>sendMessage()}>send</Button>
            <br/>
            {sentMessage ? <h4>message sent!</h4> : ""}
        </div>
    )
}
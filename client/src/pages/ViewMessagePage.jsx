import NavBar from "../components/Navbar"
import axios from 'axios'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import MessagesComponent from "../components/MessagesComponent"

export default function ViewMessagePage() {

    const [responseData, setResponseData] = useState([])
    const [messages, setMessages] = useState([])
    const [availableMessages, setAvailableMessages] = useState(false)

    let { petID } = useParams()

    useEffect(()=>{
        getMessages()
    },[])

    async function getMessages() {
        let response = await axios.get("", {params:{"petID":petID}})
        setResponseData(response.data.messages)
    }

    useEffect(()=>{
        console.log(responseData)
        if (responseData.length > 0) {
            setAvailableMessages(true)
            setMessages(responseData.map((message)=>{
                return {
                    petID: message.fields.petID,
                    title: message.fields.title,
                    message: message.fields.message,
                    sent_by: message.fields.sent_by,
                }
            }))
        }
    }, [responseData])

    return (
        <div className="ViewMessagePage">
            <NavBar /><br/>
            <h3>messages</h3>
            {availableMessages ? <MessagesComponent messages={messages}/> : <p>no messages found</p>}
        </div>
    )
}
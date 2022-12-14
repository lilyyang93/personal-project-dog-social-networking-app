import axios from "axios"
import NavBar from "../components/Navbar"
import { useState, useEffect } from "react"
import ProfileTeaser from "../components/ProfileTeaser"

export default function HomePage() {

    const [myUser, setMyUser] = useState(null)
    const [myCity, setMyCity] = useState('unknown')
    const [myImage, setMyImage] = useState(null)
    const [myPets, setMyPets] = useState([])

    useEffect(()=> {
        getUserPage()
    },[])

    async function getUserPage() {
        let response = await axios.get("homepage")
        setMyUser(response.data.firstname)
        setMyCity(response.data.location)
        setMyImage(response.data.image_url)
        setMyPets([response.data.pet_names])
    }  

    return (
        <div className="HomePage">
            <NavBar />
            <br/>
            <h1>Welcome to your homepage, {myUser}</h1>
            <hr/>
            <ProfileTeaser 
                myUser={myUser} 
                myCity={myCity} 
                image_url={myImage}
                myPets={myPets}/>
        </div>
    )
}
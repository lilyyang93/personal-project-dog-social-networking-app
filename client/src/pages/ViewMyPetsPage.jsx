import axios from 'axios'
import NavBar from '../components/Navbar'
import { useEffect, useState } from 'react'
import PetProfileTeaser from '../components/PetProfileTeaser'

export default function ViewMyPetsPage(){

    const [responseData, setResponseData] = useState([])
    const [myPets, setMyPets] = useState([])
    const [availablePets, setAvailablePets] = useState(false)

    useEffect(()=>{
        getMyPets()
    },[])

    async function getMyPets() {
        let response = await axios.get("viewmypets")
        setResponseData(response.data.pets)
    }

    useEffect(()=>{
        if (responseData.length > 0) {
            setAvailablePets(true)
            setMyPets(responseData.map((pet)=>{
                return {
                    id: pet.pk,
                    owner: pet.fields.user_pet,
                    name: pet.fields.name,
                    birthdate: pet.fields.birthdate,
                    breed: pet.fields.breed,
                    gender: pet.fields.gender,
                    spayed_neutered_status: pet.fields.spayed_neutered,
                    profile_image: pet.fields.profile_image,
                    city: pet.fields.city,
                    personality: pet.fields.personality,
                    likes: pet.fields.likes
                }
            }))
        } 
    },[responseData])

    return (
        <div className="ViewMyPetPage">
            <NavBar /><br/>
            {availablePets ? <PetProfileTeaser pets={myPets}/> : <h3>you haven't added any pets yet!</h3>}
        </div>
    )
}
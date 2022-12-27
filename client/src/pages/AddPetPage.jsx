import axios from 'axios'
import { useState, useEffect } from 'react';
import NavBar from '../components/Navbar';

export default function AddPetPage() {
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

    const [saved, setSaved] = useState(false)
    const [changeError, setChangeError] = useState(false)
    const [profileImage, setProfileImage] = useState("")

    function handleFile(event) {
        setProfileImage(pet_profile_photo)
    }

    useEffect(()=>{
        console.log(profileImage)
    },[profileImage])

    async function createPetProfile(event) {
        event.preventDefault()
        let pet_name = document.getElementById("PetName").value
        let pet_birthdate = document.getElementById("PetBirthdate").value
        let pet_breed = document.getElementById("Breed").value
        let pet_gender = document.getElementById("PetGender").value
        let spayed_neutered = document.getElementById("SpayNeuterStatus").value
        let pet_personality = document.getElementById("PetPersonality").value
        let pet_likes = document.getElementById("PetLikes").value
        let pet_profile_photo = document.getElementById("PetProfilePhoto").value

        let response = await axios.post("addpetprofile", {
            'pet_name': pet_name,
            'pet_birthdate': pet_birthdate,
            'pet_breed': pet_breed,
            'pet_gender': pet_gender,
            'spayed_neutered': spayed_neutered,
            'pet_personality': pet_personality,
            'pet_likes': pet_likes,
            'pet_profile_photo': pet_profile_photo,
        })

        if (response.data.success) {
            setSaved(true)
        } else if (!response.data.success) {
            setChangeError(true)
        }
    }

    return (
        <div className="AddPetPage">
            <NavBar />
            <h2>Add a new pet!</h2>
            <form method="post" onSubmit={createPetProfile}>
                <label for="PetName">pet name: </label>
                <input type="text" id="PetName" /><br/><br/>

                <label for="PetBirthdate">pet birthdate: </label>
                <input type="text" id="PetBirthdate" placeholder="YYYY-MM-DD" /><br/><br/>

                <label for="Breed">breed: </label>
                <input type="text" id="Breed" /><br/><br/>

                <label for="PetGender">gender: </label>
                <input type="text" id="PetGender" /><br/><br/>

                <label for="SpayNeuterStatus">spayed/neutered: </label>
                <input type="text" id="SpayNeuterStatus" /><br/><br/>

                <label for="PetPersonality">personality: </label>
                <input type="text" id="PetPersonality" /><br/><br/>

                <label for="PetLikes">my pet likes: </label>
                <input type="text" id="PetLikes" /><br/><br/>

                <label for="PetProfilePhoto">pet profile photo: </label>
                <input type="file" id="PetProfilePhoto" onChange={handleFile}/><br/><br/>
                
                <input type="submit" />
            </form><br/><br/>
            {saved ? <h4>pet profile added!</h4>: ""}
            {changeError ? <h4>error, please try again</h4>: ""}
        </div>
    )
}
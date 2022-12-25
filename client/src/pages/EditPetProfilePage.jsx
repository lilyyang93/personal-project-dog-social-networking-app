import { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import axios from "axios";

export default function EditPetProfilePage() {
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

    let { petID } = useParams()

    const [saved, setSaved] = useState(false)
    const [changeError, setChangeError] = useState(false)
    const [spayNeuterStatus, setSpayNeuterStatus] = useState("")

    async function editPetProfile(attribute) {
        let new_value = document.getElementById(attribute).value
        let response = await axios.put("", {
            "petID": petID,
            "new_value": new_value,
            "attribute": attribute,
        })
        if (response.data.success) {
            setSaved(true)
        } else if (!response.data.success) {
            setChangeError(true)
        }
    }

    function onChangeValueSpayNeuter(event) {
        setSpayNeuterStatus(event.target.value)
    }

    return (
        <div className="EditPetProfilePage">
            <NavBar /><br/>
            <h1>Edit your pet's profile / id: {petID}</h1>
            <hr/>
            <span>
                <input id="breed" type="text" placeholder="breed"/>
                <button onClick={()=>editPetProfile("breed")}>edit</button>
            </span>
            <br/><br/>
            <span>
                <input id="gender" type="text" placeholder="gender"/>
                <button onClick={()=>editPetProfile("gender")}>edit</button>
            </span>
            <br/><br/>
            <span>
                <input id="personality" type="text" placeholder="personality"/>
                <button onClick={()=>editPetProfile("personality")}>edit</button>
            </span>
            <br/><br/>
            <span>
                <input id="likes" type="text" placeholder="likes"/>
                <button onClick={()=>editPetProfile("likes")}>edit</button>
            </span>
            <br/><br/>
            <div onChange={onChangeValueSpayNeuter}>
                <label for="spayed_neutered">spayed/neutered: </label>
                    <input type="radio" id="spayed_neutered" value="yes" name="spayed_neutered" checked={spayNeuterStatus === "yes"} />yes
                    <input type="radio" id="spayed_neutered" value="no" name="spayed_neutered" checked={spayNeuterStatus === "no"} />no
                    <button onClick={()=>editPetProfile("spayed_neutered")}>edit</button>
                </div><br/><br/>
            <span>
            <label for="profile_image">pet profile photo: </label>
                <input type="file" id="profile_image" /><br/><br/>
                <button onClick={()=>editPetProfile("profile_image")}>edit</button>
            </span>
            <br/><br/>
            {saved ? <h4>changes saved!</h4> : ""}
            {changeError ? <h4>error, please try again</h4>: ""}
        </div>
    )
}
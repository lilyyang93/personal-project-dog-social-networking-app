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

    return (
        <div className="EditPetProfilePage">
            <NavBar /><br/>
            <h1>Edit your pet's profile</h1>
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

            <span>
                <input id="spayed_neutered" type="text" placeholder="spayed/neutered"/>
                <button onClick={()=>editPetProfile("spayed_neutered")}>edit</button>
            </span>
            <br/><br/>

            <span>
            <label for="profile_image">pet profile photo: </label><br/>
                <input type="file" id="profile_image" /><br/><br/><button onClick={()=>editPetProfile("profile_image")}>edit</button>
            </span>
            <br/><br/>

            {saved ? <h4>changes saved!</h4> : ""}
            {changeError ? <h4>error, please try again</h4>: ""}
        </div>
    )
}
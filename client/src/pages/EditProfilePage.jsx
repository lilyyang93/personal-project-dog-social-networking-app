import { useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";

export default function EditProfilePage() {
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

    async function editProfile(attribute) {
        let new_value = document.getElementById(attribute).value
        let response = await axios.put("editprofile", {
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
        <div className="EditProfilePage">
            <NavBar /><br/>
            <h1>Edit your profile</h1>
            <hr/>
            <span>
                <input id="first_name" type="text" placeholder="first name"/>
                <button onClick={()=>editProfile("first_name")}>edit</button>
            </span>
            <br/><br/>
            <span>
                <input id="last_name" type="text" placeholder="last name"/>
                <button onClick={()=>editProfile("last_name")}>edit</button>
            </span>
            <br/><br/>
            <span>
                <input id="city" type="text" placeholder="city"/>
                <button onClick={()=>editProfile("city")}>edit</button>
            </span>
            <br/><br/>
            <span>
                <select name="image" id="image">
                    <option value="" disabled selected hidden>profile photo</option>
                    <option value="user">default</option>
                    <option value="dog">dog</option>
                    <option value="beach">beach</option>
                    <option value="flower">flower</option>
                    <option value="mountain">mountain</option>
                    <option value="sports">sports</option>
                </select>
                <button onClick={()=>editProfile("image")}>edit</button>
            </span>
            <br/><br/>
            {saved ? <h4>changes saved!</h4> : ""}
            {changeError ? <h4>error, please try again</h4>: ""}
        </div>
    )
}
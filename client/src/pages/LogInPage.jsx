import axios from 'axios'

export default function LogInPage() {
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

    async function authenticateUser(event) {
        event.preventDefault()
        let email = document.getElementById('LogInEmail').value
        let password = document.getElementById('LogInPassword').value
        
        let response = await axios.post("login", {
            'email': email,
            'password': password,
        })
        console.log(response.data)
        if (response.data.success) {
            console.log('user successfully authenticated')
        }
    }
    return (
        <div className="LogInPage">
        <h3>Please log in</h3>
        <form onSubmit={authenticateUser}>
            <label for="LogInEmail">email: </label><input id="LogInEmail" type="text" /><br/><br/>
            <label for="LogInPassword">password: </label><input id="LogInPassword" type="password" /><br/><br/>
            <input type="submit"></input>
        </form>
        </div>
    )
}
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import IndexPage from './pages/IndexPage'
import axios from 'axios';

function App() {

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

  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
      </div>
      <IndexPage/>
    </div>
  )
}

export default App

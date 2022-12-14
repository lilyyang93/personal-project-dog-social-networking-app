import './App.css'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LogInPage from './pages/LogInPage';
import EditProfilePage from './pages/EditProfilePage';
import AddPetPage from './pages/AddPetPage';
import FindFriendsPage from './pages/FindFriendsPage';
import ViewFriendProfilePage from './pages/ViewFriendProfilePage';
import ViewMyPetsPage from './pages/ViewMyPetsPage';
import EditPetProfilePage from './pages/EditPetProfilePage';
import SendMessagePage from './pages/SendMessagePage';
import ViewMessagePage from './pages/ViewMessagePage';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<LogInPage />}> </Route>
        <Route path="/login" element={<LogInPage />}> </Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/editprofile" element={<EditProfilePage />}></Route>
        <Route path="/addpetprofile" element={<AddPetPage />}></Route>
        <Route path="/findfriends" element={<FindFriendsPage />}></Route>
        <Route path="/viewfriend:petID" element={<ViewFriendProfilePage />}></Route>
        <Route path="/viewmypets" element={<ViewMyPetsPage />}></Route>
        <Route path="/editpetprofile:petID" element={<EditPetProfilePage />}></Route>
        <Route path="/sendmessage:petID" element={<SendMessagePage />}></Route>
        <Route path="/viewmessages:petID" element={<ViewMessagePage />}></Route>
      </Routes>
    </div>
    </Router>
  )
}

export default App

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import SignUp from './SignUp'
import {ToastContainer} from "react-toastify"
import Home from './Home'
import Profile from './Profile'
import Game from './Game'


function App() {

  return (
   <>
   
   <Router>
   <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/game" element={<Game/>}/>

   </Routes>
   </Router>
   <ToastContainer/>
   </>
  )
}

export default App

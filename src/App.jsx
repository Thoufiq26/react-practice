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
import ExpenseTracker from './ExpenseTracker'
import Resume from './Resume'
import KanbanBoard from './KanbanBoard'
import SnakeAndLadders from './SnakeAndLadders'
import BMI from './BMI'
import Stopwatch from './Stopwatch'
import MongoDB_Authentication from './MongoDB_Authentication'
import MongoDB_SIgnUp from './MongoDB_SIgnUp'
import Users from './Users'
import UpdateUsers from './updateUsers'
import CreateUsers from './CreateUsers'
import ImageDB from './ImageDB'


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
    <Route path="/expense-tracker" element={<ExpenseTracker/>}/>
    <Route path="/resume" element={<Resume/>}/>
    <Route path="/kanban" element={<KanbanBoard/>}/>
    <Route path="/snake" element={<SnakeAndLadders/>}/>
    <Route path="/bmi" element={<BMI/>}/>
    <Route path="/stop-watch" element={<Stopwatch/>}/>
    <Route path="/mongodb-login" element={<MongoDB_Authentication/>}/>
    <Route path="/mongodb-signup" element={<MongoDB_SIgnUp/>}/>
    <Route path="/users" element={<Users/>}/>
    <Route path="/update-users/:id" element={<UpdateUsers/>}/>
    <Route path="/create-users" element={<CreateUsers/>}/>
    <Route path="/image-upload" element={<ImageDB/>}/>
   </Routes>
   </Router>
   <ToastContainer/>
   </>
  )
}

export default App

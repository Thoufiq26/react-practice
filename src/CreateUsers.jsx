import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

function CreateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate=useNavigate();

  const submit =(e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/create-users',{
        name,email,age
    }).then(result=>console.log(result))
    navigate('/users')
    .catch(err=>console.log(err))
  }

  return (
    <div>
      <div className="create-form-page">
        <div className="create-form">
          <form action="" method="POST" onSubmit={submit}>
            <div className="name">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="age">
              <label htmlFor="age">Age</label>
              <input type="text" name="age" id="age" value={age} onChange={(e)=>setAge(e.target.value)} />
            </div>
            <button type="submit">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUsers;

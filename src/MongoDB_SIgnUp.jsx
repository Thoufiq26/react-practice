import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

function MongoDB_SIgnUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/mongodb-signup',{firstName,lastName,email,password})
    .then(res=>console.log(res))
    .catch((err)=>console.log(err))

  };


  return (
    <div className="login-page">
      <div className="login-card2">
        <h1>MONGODB SIGNUP</h1>
        <form onSubmit={handleSubmit}>
          <div className="first-name">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="last-name">
            <label htmlFor="last-name">Second Name</label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setSecondName(e.target.value)}
              required
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn">
            <button type="submit">Sign Up</button>
          </div>
        </form>

        <div className="new" style={{ marginTop: "15px" }}>
          <h4>
            Already a user?{" "}
            <Link to="/mongodb-login" className="link">
              Log In
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default MongoDB_SIgnUp;

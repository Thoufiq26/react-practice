import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "./Firebase";
import GoogleButton from 'react-google-button'

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email,
          firstName,
          secondName,
          Balance:1000
        });
      }
      console.log(user);
      toast.success("User Registered Successfully", {
        position: "top-center",
      });
      navigate("/game");
    } catch (e) {
      console.log(e.message);
      toast.error(e.message, {
        position: "bottom-center",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: user.displayName?.split(" ")[0] || "",
        secondName: user.displayName?.split(" ")[1] || "",
      });
      toast.success("Signed in with Google!", {
        position: "top-center",
      });
      navigate("/game");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed!", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card2">
        <h1>SIGNUP</h1>
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
              value={secondName}
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

        <div className="google-btn">
        <GoogleButton onClick={handleGoogleSignIn}/>

        </div>
    
        

        <div className="new" style={{ marginTop: "15px" }}>
          <h4>
            Already a user? <Link to="/login" className="link">Log In</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

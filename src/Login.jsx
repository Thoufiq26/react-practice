import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "./Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import GoogleButton from 'react-google-button';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        console.log("User logged in successfully:", user);
        toast.success("Log in Successful!", {
          position: "top-right",
        });
        navigate("/profile");
      }
    } catch (e) {
      console.error("Login error:", e.message);
      toast.error(e.message, {
        position: "top-right",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed in with Google!", {
        position: "top-right",
      });
      navigate("/profile");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed!", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
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
            <button type="submit">Log In</button>
          </div>
        </form>

        <div className="google-btn" style={{ marginTop: "15px" }}>
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>

        <div className="new" style={{ marginTop: "15px" }}>
          <h4>
            Not a User? <Link to="/signup" className="link">Register Now</Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Login;
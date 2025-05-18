import React, { useState } from "react";
import { Link } from "react-router-dom";

function MongoDB_Authentication() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>MONGODB LOGIN</h1>
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

        <div className="new" style={{ marginTop: "15px" }}>
          <h4>
            Not a User?{" "}
            <Link to="/mongodb-signup" className="link">
              Register Now
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default MongoDB_Authentication;

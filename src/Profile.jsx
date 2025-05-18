import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <div className="content">
      <h1 className="choose">Choose an Option</h1>
      <button className="button-33" onClick={() => navigate("/game")}>
        Play Seven Up Seven Down
      </button>
      <button className="button-33" onClick={() => navigate("/expense-tracker")}>
        Go to Expense Tracker
      </button>
      <button className="button-33" onClick={() => navigate("/resume")}>
        Go to Resume
      </button>
      <button className="button-33" onClick={() => navigate("/kanban")}>
        Kanban Board
      </button>
      <button className="button-33" onClick={() => navigate("/snake")}>
        Snake & Ladders
      </button>
      <button className="button-33" onClick={() => navigate("/bmi")}>
        Calculate your BMI
      </button>
      <button className="button-33" onClick={() => navigate("/stop-watch")}>
        StopWatch
      </button>
       <button className="button-33" onClick={() => navigate("/mongodb-login")}>
        MongoDB LogIn
      </button>
       <button className="button-33" onClick={() => navigate("/mongodb-signup")}>
        MongoDB SignUp
      </button>
       <button className="button-33" onClick={() => navigate("/users")}>
        MongoDB CRUD
      </button>
       <button className="button-33" onClick={() => navigate("/image-upload")}>
        Upload Image to MongoDB
      </button>
    
      </div>
    
    </div>
  );
}

export default Dashboard;

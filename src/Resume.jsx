import React from 'react'
import thoufiq from "./assets/thoufiq.jpeg"

function Resume() {
  return (
    <>
        <div className="containerr">
    <div className="header">
      <div>
        <h1>Thoufiq PS</h1>
        <h3>Creative and Innovative Web Developer</h3>
      </div>
      <img src={thoufiq} alt="profile" className="profile-img"  />
    </div>

    <div className="contact-info">
      <p><i className="fa-solid fa-location-dot"></i> Madanapalle</p>
      <p><i className="fa-solid fa-phone"></i> 9440733910</p>
      <p><i className="fa-solid fa-envelope"></i> thoufiqaa11@gmail.com</p>
    </div>

    <div className="resume">
      <div className="left">
        <div className="section">
          <h2>Profiles</h2>
          <p><i className="fa-brands fa-linkedin"></i> Shaik Thoufiq</p>
          <p><i className="fa-brands fa-github"></i> Thoufiq26</p>
        </div>

        <div className="section">
          <h2>Skills</h2>
          <h4>Web Technologies</h4>
          <p>HTML, CSS, JavaScript, React.js, Node.js, Express.js</p>
          <h4>Tools</h4>
          <p>Git, Jenkins, VS Code</p>
        </div>

        <div className="section">
          <h2>Certifications</h2>
          <h4>Full Stack Web Development</h4>
          <p>Coursera - 2024</p>
          <h4>Python Essentials</h4>
          <p>Coursera - 2024</p>
          <h4>Python Essentials</h4>
          <p>Coursera - 2024</p>
         
        </div>
        

        <div className="section">
          <h2>Languages</h2>
          <p>English</p>
          <p>Hindi</p>
        </div>
      </div>

      <div className="right">
        <div className="section">
          <h2>Summary</h2>
          <p>
            A highly motivated and skilled web developer with a passion for creating dynamic and user-friendly web applications. Proficient in HTML, CSS, JavaScript, React.js, Node.js, and Express.js. Strong problem-solving skills and a keen eye for detail. Eager to learn and adapt to new technologies.
          </p>
        </div>

        <div className="section">
          <h2>Experience</h2>
          <h4>Web Developer Intern</h4>
          <p>ABC Company, City, State | June 2023 - Present</p>
          <ul>
            <li>Developed and maintained web applications using HTML, CSS, and JavaScript.</li>
            <li>Collaborated with designers and developers to create user-friendly interfaces.</li>
            <li>Assisted in debugging and troubleshooting issues in existing applications.</li>
          </ul>
        </div>
        <div className="section">
          <h2>Education</h2>
          <h4>Madanapalle Institute of Technology & Science</h4>
          <p>CGPA: 8.67</p>
          <h4>Mother Teresa Junior College</h4>
          <p>Percentage: 78.8%</p>
        </div>
        <div className="section">
          <h2>Projects</h2>
          <div className="section-pro">
            <div className="projects">
              <h4>Mocksy: An AI Mock Interviewer</h4>
              <p>AI mock interview tool to prepare for interviews and apply for jobs.</p>
            </div>
            <div className="projects">
              <h4>Fuel Tracker App</h4>
              <p>Web app to calculate fuel usage, track prices, and analyze travel distance.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
    </>
  )
}

export default Resume
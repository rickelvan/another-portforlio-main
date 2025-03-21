import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Portfolio.css';

const Portfolio = () => {
  const { logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Your existing script.js functionality
    const dynamicText = document.querySelector(".dynamic-text");
    const words = ["Software Developer", "Web Developer", "Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      dynamicText.textContent = currentChar;

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 200);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 100);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
      }
    };

    typeEffect();

    // Back to top functionality
    const backToTopButton = document.getElementById("back-to-top");
    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    };

    // Apply initial theme
    document.body.className = isDarkMode ? '' : 'light-mode';
  }, [isDarkMode]);

  const handleBackToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <header>
        <div>My Portfolio</div>
        <nav>
          <a href="#home" className="active">Home</a>
          <a href="#education">Education</a>
          <a href="#hobby-video">Hobby Video</a>
          <a href="#personal-details">Personal Details</a>
          <a href="#useful-links">Useful Links</a>
          <a href="#" onClick={logout} style={{ color: '#e63946' }}>Logout</a>
        </nav>
      </header>

      <button id="theme-toggle" onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      <div id="home" className="home">
        <div className="profile-container">
          <h2>Derrick</h2>
          <img src="/profile.jpg" alt="Profile Picture" className="profile-pic" />
        </div>
        <div className="content">
          <h1>Hey, It's <span style={{ color: '#e63946' }}>Derrick</span></h1>
          <p>I'm a <span className="dynamic-text"></span><span className="typing-cursor">|</span></p>
          <div className="social-links">
            <a href="mailto:rickelvan86@gmail.com">Email</a>
            <a href="https://x.com/Derick_Katende" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://github.com/rickelvan" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
          <a href="https://wa.me/256702164757" className="hire-button" target="_blank" rel="noopener noreferrer">Hire Me</a>
        </div>
      </div>

      <div id="education" className="section">
        <h2>Education - Year 1 Semester 1 Results</h2>
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Grade</th>
              <th>Credit Units</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>CSC101</td><td>Introduction to Programming</td><td>A</td><td>3</td></tr>
            <tr><td>MTH102</td><td>Calculus I</td><td>B+</td><td>4</td></tr>
            <tr><td>PHY103</td><td>Physics for Engineers</td><td>A-</td><td>3</td></tr>
            <tr><td>ENG104</td><td>Academic Writing</td><td>B</td><td>2</td></tr>
            <tr><td>HIS105</td><td>World History</td><td>A</td><td>2</td></tr>
          </tbody>
        </table>
      </div>

      <div id="hobby-video" className="section">
        <h2>Hobby Video</h2>
        <video controls>
          <source src="/hobby.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div id="personal-details" className="section">
        <h2>Personal Details</h2>
        <ul>
          <li><strong>Full Name:</strong> Katende Derrick Elvan</li>
          <li><strong>Student ID:</strong> B22771</li>
          <li><strong>Course and Year:</strong> B.Sc. in Computer Science, Year 2</li>
          <li><strong>Hobbies and Interests:</strong> Hanging out with the boys, photography, gaming</li>
        </ul>
      </div>

      <div id="useful-links" className="section">
        <h2>Useful Links</h2>
        <p>Visit my favorite website: <a href="https://www.bmw.com/en/index.html" target="_blank" rel="noopener noreferrer">BMW Official Website</a></p>
        <p>More about my department: <a href="https://cse.ucu.ac.ug/" target="_blank" rel="noopener noreferrer">UCU Computer Science Department</a></p>
      </div>

      <button id="back-to-top" onClick={handleBackToTop}>Back to Top</button>
    </>
  );
};

export default Portfolio; 
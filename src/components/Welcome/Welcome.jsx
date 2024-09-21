import React, { useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';

import './Welcome.css';


const Welcome = () => {

  const navigate = useNavigate();

  const [theme, setTheme] = useState('light'); // Default theme




  // On component mount, check if a theme is saved in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference to localStorage
  };

  

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const cardElements = document.querySelectorAll(".hidden");

    cardElements.forEach((element) => observer.observe(element));

    // Cleanup the observer when the component unmounts
    return () => {
      cardElements.forEach((element) => observer.unobserve(element));
    };
  }, []); 


  
  // Function to handle the Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate('/email'); // Navigate to /email when Enter is pressed
    }
  };

  useEffect(() => {
    // Add event listener for keypress on component mount
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);



  return (
    <>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>

    <div className="wlcm">
        <div className="wlcm-left hidden">
            <h1>Welcome to our <br />form</h1>
            <p>This is a description of the form</p>
            <span className='wlcm-btn'>
                <a href="/email">
                  <button className=''>Start</button>
                </a>
                <p>press <b>Enter</b><img src={require("../../assets/enter.png")} alt="" /></p>
            </span>
        </div>
        <div className="wlcm-right">
            <img src={require("../../assets/002.png")} alt="" />
        </div>
    </div>
    </>
  )
}

export default Welcome
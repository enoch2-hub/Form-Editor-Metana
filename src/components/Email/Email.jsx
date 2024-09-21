import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import './Email.css';

const Email = () => {

    const [email, setEmail] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isShaking, setIsShaking] = useState(false);

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

    
    
    const navigate = useNavigate();

    // Function to handle Backspace key press
    const handleKeyPress = (event) => {
        if (event.key === 'Backspace') {
        navigate('/welcome'); // Navigate back to /welcome when Backspace is pressed
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




    // Function to validate email format
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        // Set validation status
        if (!validateEmail(value)) {
        setIsValid(false);
        setIsShaking(true); // Add shake animation on invalid email
        } else {
        setIsValid(true);
        setIsShaking(false); // Stop shaking once valid
        }
  };
    
    
      return (
        <>
          <button onClick={toggleTheme}>
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>

        <div className="email">
            <div className="email-left hidden">
                <h1>1 ➔ Enter your email</h1>
                <p>This will be used to contact you for the next steps</p>
                
                <input
                    type="email"
                    placeholder="Type here..."
                    value={email}
                    onChange={handleChange}
                    className={!isValid ? 'invalid' : ''}
                    style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: `1px solid ${isValid ? '#ccc' : 'red'}`,
                    outline: 'none',
                    fontSize: '16px',
                    }}
                    onAnimationEnd={() => setIsShaking(false)} // Stop shaking after animation ends
                />
                {!isValid && (
                    <p style={{ color: 'red', marginTop: '5px',fontSize: '14px' }}>
                    Please enter a valid email address.
                    </p>
                )}


            <p>Press <img src={require('../../assets/back.png')} alt="" /> Backspace to return to the Welcome page</p>
                
            </div>


        </div>




        </>
      )
}

export default Email






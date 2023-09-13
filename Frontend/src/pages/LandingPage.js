// author: Utkarsh Shah <Utkarsh.Shah@dal.ca>

import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/slider1.png'
const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/user/login');
  };

  const handleSignUp = () => {
    navigate('/user/register');
  };

  const styles = {
    landingPage: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      marginTop: '350px'
    },
    ctaButton: {
      padding: '15px 30px',
      fontSize: '1.1em',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    ctaSignIn: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    ctaSignUp: {
      backgroundColor: '#28a745',
      color: 'white',
    },
  };

  return (
    <div style={styles.landingPage}>
      <div style={styles.ctaButtons}>
        <button onClick={handleSignIn} style={{ ...styles.ctaButton, ...styles.ctaSignIn }}>
          Sign In
        </button>
        <button onClick={handleSignUp} style={{ ...styles.ctaButton, ...styles.ctaSignUp }}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;

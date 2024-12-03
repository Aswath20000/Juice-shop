import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Welcome to OWASP Juice Shop Clone</h1>
      <p>Please choose an option:</p>
      <nav>
        <Link to="/login">
          <button style={{ margin: '10px' }}>Login</button>
        </Link>
        <Link to="/register">
          <button style={{ margin: '10px' }}>Register</button>
        </Link>
      </nav>
    </div>
  );
};

export default Home;

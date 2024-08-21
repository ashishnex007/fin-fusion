import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1 className="text-3xl font-bold">Welcome to Fin Fusion</h1>
      <p>Your banking data aggregator platform</p>
      <div>
        <Link to="/login" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>Login</Link>
        <Link to="/signup" style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}>Signup</Link>
      </div>
    </div>
  );
};

export default LandingPage;
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>At Home</h1>
      <h4>
        <Link to={'/starred'}>Go to Starred</Link>
      </h4>
    </div>
  );
}

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      At Home
      <h1>
        <Link to={'/starred'}>Go to Starred</Link>
      </h1>
    </div>
  );
}

export default Home;

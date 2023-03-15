import React from 'react';
import { Link } from 'react-router-dom';

function Starred() {
  return (
    <div>
      {' '}
      At Home
      <h1>
        <Link to={'/'}>Go to Home</Link>
      </h1>
    </div>
  );
}

export default Starred;

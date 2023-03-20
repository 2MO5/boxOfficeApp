import React from 'react';
import { Link } from 'react-router-dom';
import { useStarredShows } from '../lib/useStarredShows';

function Starred() {
  const [starredShows] = useStarredShows(); //only need the data here. No action

  return (
    <div>
      <h1>starred page</h1>
      You have starred {starredShows.length} movies!
    </div>
  );
}

export default Starred;

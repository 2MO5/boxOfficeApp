import React from 'react';
import { Link } from 'react-router-dom';

export const ShowCard = ({ name, image, id, summary }) => {
  const strippedSummary = summary
    ? summary.split('').slice(0, 20).join('').replace(/<.+?>/g, '')
    : 'No description';

  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      <h1>{name}</h1>
      <p>{strippedSummary}</p>
      <div>
        <Link to={`/show/${id}`}>Read More</Link>
        <button type="button">Star ME!</button>
      </div>
    </div>
  );
};

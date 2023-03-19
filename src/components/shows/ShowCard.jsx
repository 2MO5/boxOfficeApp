import React from 'react';

export const ShowCard = ({ name, image, id, summary, onStarMeClick }) => {
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
        {/* Link is used for client side rendering/routing through react router */}
        {/* <Link to={`/show/${id}`}>Read More</Link> */}
        {/* Want to open the page in another tab (not related to client side rendering/routing)? Use the <a href! */}
        <a href={`/show/${id}`} target="_blank" rel="noreferrer">
          Read More
        </a>
        <button type="button" onClick={() => onStarMeClick(id)}>
          Star ME!
        </button>
      </div>
    </div>
  );
};

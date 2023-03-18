import React from 'react';

const ShowMainData = ({ name, image, rating, summary, genres }) => {
  return (
    <div>
      <img src={image ? image.original : './not-found-image.png'} alt={name} />

      <div>
        <h1>{name}</h1>
        <div>{rating.average || 'N/A'}</div>
        <div dangerouslySetInnerHTML={{ __html: summary }} />{' '}
        {/* else you can use the regex with the split, slice and join as in the showcawrd*/}
        <div>
          Genres:
          <div>
            {genres.map(genre => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMainData;

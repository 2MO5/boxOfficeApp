import React from 'react';

export const ActorCard = ({
  name,
  image,
  country,
  geneder,
  birthday,
  deathday,
}) => {
  return (
    <div>
      <div>
        <img src={image} alt={name} />
      </div>
      {/* Need to make sure it's boolean */}
      <h1>
        {name} {!!geneder && `(${geneder})`}
      </h1>
      <p>{country ? `comes from country ${country} ` : 'Country Unkown'}</p>
      {!!birthday && <p>Born on {birthday}</p>}

      <p>{deathday ? `Died ${deathday}` : 'Alive!'}</p>
    </div>
  );
};

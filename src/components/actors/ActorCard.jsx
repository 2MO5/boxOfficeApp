import React from 'react';
import { SearchCard, SearchImgWrapper } from '../common/SearchCard';

export const ActorCard = ({
  name,
  image,
  country,
  geneder,
  birthday,
  deathday,
}) => {
  return (
    <SearchCard>
      <SearchImgWrapper>
        <img src={image} alt={name} />
      </SearchImgWrapper>
      {/* Need to make sure it's boolean */}
      <h1>
        {name} {!!geneder && `(${geneder})`}
      </h1>
      <p>{country ? `comes from country ${country} ` : 'Country Unkown'}</p>
      {!!birthday && <p>Born on {birthday}</p>}

      <p>{deathday ? `Died ${deathday}` : 'Alive!'}</p>
    </SearchCard>
  );
};

import React from 'react';
import { ActorCard } from './ActorCard';

const ActorsGrid = ({ actors }) => {
  return (
    <div>
      {actors.map(data => {
        return (
          <>
            <ActorCard
              name={data.person.name}
              image={
                data.person.image
                  ? data.person.image.medium
                  : './not-found-image.png'
              }
              country={data.person.country ? data.person.country.name : null}
              geneder={data.person.gender}
              birthday={data.person.birthday}
              deathday={data.person.deathday}
            />
          </>
        );
      })}
    </div>
  );
};

export default ActorsGrid;

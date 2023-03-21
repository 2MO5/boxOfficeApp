import React from 'react';
import { FlexGrid } from '../common/FlexGrid';
import { ActorCard } from './ActorCard';

const ActorsGrid = ({ actors }) => {
  return (
    <FlexGrid>
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
    </FlexGrid>
  );
};

export default ActorsGrid;

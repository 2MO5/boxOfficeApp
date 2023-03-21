import React, { useEffect, useReducer } from 'react';
import { useStarredShows } from '../../lib/useStarredShows';
import { FlexGrid } from '../common/FlexGrid';
import { ShowCard } from './ShowCard';

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchStarred] = useStarredShows(); //bringing in our custom reducer
  // const [starredShows, dispatchedStarred] = usePersistedReducer(
  //   starredShowsReducer,
  //   [],
  //   'starredShows'
  // );
  console.log('@23: ', { starredShows });
  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId); //does the starred shows include the id of this show?

    if (isStarred) {
      dispatchStarred({ type: 'UNSTAR', showId });
    } else {
      dispatchStarred({ type: 'STAR', showId });
    }
  };

  console.log(shows);
  return (
    <FlexGrid>
      {shows.map(data => {
        return (
          <>
            <ShowCard
              key={data.show.id}
              id={data.show.id} //when directing to the page
              name={data.show.name}
              image={
                data.show.image
                  ? data.show.image.medium
                  : './not-found-image.png'
              }
              summary={data.show.summary}
              onStarMeClick={onStarMeClick}
              //we've synchronized all these with local storage
              isStarred={starredShows.includes(data.show.id)} //does the starredshow contains the current shows id?
            />
          </>
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;

import React, { useEffect, useReducer } from 'react';
import { ShowCard } from './ShowCard';

// this function should mimic the behavior of the starred reducer plus there has
// to be a way to synchronize it with the browser
// ==>  usePersistedReducer(reducer,[initialKey], 'localstroage key')
const usePersistedReducer = (reducer, initialState, localStorageKey) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persistedValue = localStorage.getItem(localStorageKey);

    //Got a persistedValue in the broweser? Take it but change it an object
    // Got nothing? Get the initial value, which is the initial state
    return persistedValue ? JSON.parse(persistedValue) : initial;
  });

  //state or localStorageKey gets any change? Do perform this then! (this is the synchronization)
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, localStorageKey]);

  //At the end give out these. Simply dispatching the state when it's command to
  return [state, dispatch]; //to resemble the original useReducer hook
};
// {type: 'STAR' ,showId: ''}
// {type: 'UNSTAR' ,showId: ''}
const starredShowsReducer = (currentStarred, action) => {
  switch (action.type) {
    case 'STAR':
      //add the movie id to the current starred list

      return currentStarred.concat(action.showId);

    case 'UNSTAR':
      return currentStarred.filter(showId => showId !== action.showId); //filter out what doesn't. Yup a new array without the id that we want to remove

    default:
      return;
  }
};

const ShowGrid = ({ shows }) => {
  const [starredShows, dispatchedStarred] = usePersistedReducer(
    starredShowsReducer,
    [],
    'starredShows'
  );
  console.log('@23: ', { starredShows });
  const onStarMeClick = showId => {
    const isStarred = starredShows.includes(showId); //does the starred shows include the id of this show?

    if (isStarred) {
      dispatchedStarred({ type: 'UNSTAR', showId });
    } else {
      dispatchedStarred({ type: 'STAR', showId });
    }
  };

  console.log(shows);
  return (
    <div>
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
            />
          </>
        );
      })}
    </div>
  );
};

export default ShowGrid;

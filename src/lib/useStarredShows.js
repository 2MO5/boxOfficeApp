import { useEffect, useReducer } from 'react';

//this is a reducer
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

//A hook inside a hook (Staying on top of another)
// This is also a reducer. But more of an abstract one
export const useStarredShows = () => {
  return usePersistedReducer(starredShowsReducer, [], 'starredShows');
};

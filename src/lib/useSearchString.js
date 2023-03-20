import { useEffect, useState } from 'react';
//use is to store the state variable string in session storage
const usePersistedState = (initialState, sessionStorageKey) => {
  const [state, setState] = useState(() => {
    const persistedValue = sessionStorage.getItem(sessionStorageKey);

    return persistedValue ? JSON.parse(persistedValue) : initialState;
  });

  //here's the synchronization where you set the session
  //whenver the session storage or the state get changed
  useEffect(() => {
    sessionStorage.setItem(sessionStorageKey, JSON.stringify(state));
  }, [state, sessionStorageKey]);

  //to keep the same api as the useState Hook we return the following
  return [state, setState];
};

// export const useSearchString = () => {
//   const [state,setState] = usePersistedState('', 'searchString');

//   return [state, setState];
// };
export const useSearchString = () => {
  return usePersistedState('', 'searchString');
};

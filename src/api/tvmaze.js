const BASE_URL = 'https://api.tvmaze.com';

export const apiGet = async queryString => {
  const response = await fetch(`${BASE_URL}${queryString}`);
  const body = await response.json();

  return body;
};

// /search/shows?q=${queryURL} <== queryString

//compressing the above even furhter
// export const searchForShows = query => {
//    return apiGet(`/search/shows?q=${query}`);
// };
export const searchForShows = query => apiGet(`/search/shows?q=${query}`); //<== These are called reusuable functions!
export const searchForPeople = query => apiGet(`/search/people?q=${query}`);
export const getShowById = showId =>
  apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`);
export const getShowsByIds = async showIds => {
  // get all the showIds and their info into one place
  // which we are going to use as a promise
  // these promises are not dependent on each other that's why we can handle 'em parrallely
  const promises = showIds.map(showId => apiGet(`/shows/${showId}`));

  const result = await Promise.all(promises); //resolve the whole array at once
  // [reolve1,resolve2, null, undefined] order is retained
  console.log('result: ', result);
  return result; //we're gonna have an array of shows
};

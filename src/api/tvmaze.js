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

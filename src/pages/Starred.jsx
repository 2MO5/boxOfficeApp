import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import { getShowById, getShowsByIds } from '../api/tvmaze';
import ShowGrid from '../components/shows/ShowGrid';
import { useStarredShows } from '../lib/useStarredShows';

function Starred() {
  //the arraay of ids in local storage
  const [starredShowsIds] = useStarredShows(); //only need the data here. No action

  //querying the data for the starred shows
  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowsIds], //starredshows only contains the ids and we're passing all of 'em here!
    // queryFn: () => {
    //   //we need our result to contain show property
    //   getShowById(starredShowsIds).then(result =>
    //     result.map(showData => {
    //       return { showData };
    //     })
    //   );
    // },
    queryFn: () =>
      //we need our result to contain show property
      getShowsByIds(starredShowsIds).then(
        result =>
          // result.map(showData => ({ showData })) <==Doesn't work?
          result.map(show => ({ show })) //we should pass it 'show' it can pass the right data
      ),
    refetchOnWindowFocus: false,
  });

  console.log('starredShows: ', { starredShows });

  if (starredShows?.length > 0) {
    return (
      <>
        <p> You have starred {starredShowsIds.length} movies!</p>

        <ShowGrid shows={starredShows} />
      </>
    );
  }
  if (starredShows?.length === 0) {
    return <div>Empty here! Strange that you got nothing to star!</div>;
  }
  if (starredShowsError) {
    return <div>Error!!! {starredShowsError.message}</div>;
  }

  return <div>Wait! It is loading!</div>;
}

export default Starred;

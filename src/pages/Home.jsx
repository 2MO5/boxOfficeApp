import { useQuery } from '@tanstack/react-query';
import React, { useReducer, useState } from 'react';
import { searchForPeople, searchForShows } from '../api/tvmaze';
import ActorsGrid from '../components/actors/ActorsGrid';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';

const reducerFunction = (currentCounter, action) => {
  //this reducer function must return a state
  console.log({ currentCounter, action });
  switch (action.type) {
    case 'INCREMENT':
      return currentCounter + 1;
    case 'DECREMENT':
      return currentCounter - 1;
    case 'NEW_RESET':
      return action.newCounter;
    // case 'NEW_RESET':
    //   return (currentCounter = 600);
    case 'RESET':
      return 0;
  }
  return 0;
};

function Home() {
  // const [apiData, setApiData] = useState([]);
  // const [apiDataError, setApiDataError] = useState(null);

  const [filter, setFilter] = useState(null);
  // const [counter,dispatch] = useReducer(reducerFunction,initialState goes herecounter);
  const [counter, dispatch] = useReducer(reducerFunction, 0);
  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOptions === 'shows'
        ? searchForShows(filter.query)
        : searchForPeople(filter.query),
    // ⬇️ disabled as long as the filter is empty
    enabled: !!filter, //query disabled when filter is false. True? Enable it!
    refetchOnWindowFocus: false,
  });

  //Here are the sharp actions dispatched vegem
  // const onIncrement = () => {
  //   //setCounter(counter + 1)
  //   dispatch({ type: 'INCREMENT' });
  // };
  // const onDecrement = () => {
  //   dispatch({ type: 'DECREMENT' });
  //   // setCounter(counter - 1)
  // };
  // const onReset = () => {
  //   dispatch({ type: 'RESET' });
  //   // setCounter(0)
  // };
  // const onNewReset = () => {
  //   dispatch({ type: 'NEW_RESET', newCounter: 500 });
  // };
  //this onSearch function is pased as a prop to the searchForm component
  const onSearch = async ({ query, searchOptions }) => {
    //clicked the search ? the filer state ⬇️ is changed
    setFilter({ query, searchOptions });
    // console.log(e);
    // fetch('https://api.tvmaze.com/search/shows?q=girls')
    //   .then(response => response.json())
    //   .then(body => console.log(body));

    // /search/shows?q=:query
    //getting the response
    // const response = await fetch(
    //   `https://api.tvmaze.com/search/shows?q=${searchString}`
    // );
    // const body = await response.json();

    // const body = await apiGet(`/search/shows?q=${searchString}`)

    // try {
    //   setApiDataError(null);

    //   let result;

    //   if (searchOptions === 'shows') {
    //     result = await searchForShows(query);
    //   } else {
    //     result = await searchForPeople(query);
    //   }
    //   console.log('result @50: ', result);
    //   setApiData(result);

    //   console.log('api: ', apiData);
    // } catch (error) {
    //   setApiDataError(error);
    //   console.log('error at API: ', apiDataError);
    // }
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>This happened: {apiDataError.message}! </div>;
    }
    if (apiData?.length === 0) {
      return <div>No results</div>;
    }
    //got actors? show the actors! Else throw out the shows
    if (apiData) {
      // console.log('apiData[0]: ', apiData[0]);
      //returns do two things: cancelling off and giving it out the result
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
      // return apiData[0].show
      //   ? apiData.map(data => <div key={data.show.id}>{data.show.name} </div>)
      //   : apiData.map(data => (
      //       <div key={data.person.id}>{data.person.name} </div>
      //     ));
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      {/* <div>Counter: {counter}</div> */}
      {/* Awaiting actions are fired from here */}
      {/* <button type="button" onClick={onIncrement}>
        Increment
      </button>
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onNewReset}>
        New Reset
      </button> */}
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;

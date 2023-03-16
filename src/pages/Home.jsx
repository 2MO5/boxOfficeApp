import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchForPeople, searchForShows } from '../api/tvmaze';
import SearchForm from '../components/SearchForm';

function Home() {
  const [apiData, setApiData] = useState([]);
  const [apiDataError, setApiDataError] = useState(null);

  console.log('error at API: ', apiDataError);

  //this onSearch function is pased as a prop to the searchForm component
  const onSearch = async ({ query, searchOptions }) => {
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

    try {
      setApiDataError(null);

      let result;

      if (searchOptions === 'shows') {
        result = await searchForShows(query);
      } else {
        result = await searchForPeople(query);
      }
      console.log('result @50: ', result);
      setApiData(result);

      console.log('api: ', apiData);
    } catch (error) {
      setApiDataError(error);
      console.log('error at API: ', apiDataError);
    }
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
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name} </div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name} </div>
          ));
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;

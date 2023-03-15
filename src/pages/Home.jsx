import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchForShows } from '../api/tvmaze';

function Home() {
  const [searchString, setSearchString] = useState('');
  const [apiData, setApiData] = useState([]);
  const [apiDataError, setApiDataError] = useState(null);
  console.log(searchString);
  console.log('error at API: ', apiDataError);

  const onSearchInputChange = e => {
    // console.log('event: ', e);
    // console.log('targeted value: ', e.target.value);
    setSearchString(e.target.value); //setting the input value here
  };

  const formSubmit = async e => {
    e.preventDefault();
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
      const result = await searchForShows(searchString);
      setApiData(result);
      console.log(result);
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

    if (apiData) {
      //returns do two things: cancelling off and giving it out the result
      return apiData.map(data => (
        <div key={data.show.id}>{data.show.name} </div>
      ));
    }

    return null;
  };

  return (
    <div>
      <h1>At Home</h1>
      <h4>
        <Link to={'/starred'}>Go to Starred</Link>
      </h4>
      <form action="" onSubmit={formSubmit}>
        <input
          type="text"
          value={searchString}
          onChange={onSearchInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;

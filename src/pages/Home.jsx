import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchForPeople, searchForShows } from '../api/tvmaze';

function Home() {
  const [searchString, setSearchString] = useState('');
  const [apiData, setApiData] = useState([]);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOptions, setSearchOptions] = useState('shows');

  console.log(searchString);
  console.log('@23: ', searchOptions);

  console.log('error at API: ', apiDataError);

  const onSearchInputChange = e => {
    // console.log('event: ', e);
    // console.log('targeted value: ', e.target.value);
    setSearchString(e.target.value); //setting the input value here
  };

  const onRadioChange = e => {
    console.log('@21: ', e.target.value);
    setSearchOptions(e.target.value);
    // console.log('@23: ', searchOptions);
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

      if (searchOptions === 'shows') {
        const result = await searchForShows(searchString);
        setApiData(result);
        console.log('result @50: ', result);
      } else {
        const result = await searchForPeople(searchString);
        setApiData(result);
        console.log('result @50: ', result);
      }

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

        <label htmlFor="">
          Shows
          <input
            type="radio"
            name="search-option"
            checked={searchOptions === 'shows'}
            value="shows"
            onChange={onRadioChange}
          />
        </label>
        <label htmlFor="">
          Actors
          <input
            type="radio"
            name="search-option"
            checked={searchOptions === 'actors'}
            value="actors"
            onChange={onRadioChange}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <div>{renderApiData()}</div>
    </div>
  );
}

export default Home;

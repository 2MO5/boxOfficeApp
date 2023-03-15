import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchString, setSearchString] = useState('');
  console.log(searchString);

  const onSearchInputChange = e => {
    // console.log('event: ', e);
    console.log('targeted value: ', e.target.value);
    setSearchString(e.target.value); //setting the input value here
  };

  const formSubmit = async e => {
    e.preventDefault();
    // console.log(e);
    // fetch('https://api.tvmaze.com/search/shows?q=girls')
    //   .then(response => response.json())
    //   .then(body => console.log(body));

    //getting the response
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchString}`
    );
    const body = await response.json();

    console.log(body);
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
        <button type="submit">Random Change</button>
      </form>
    </div>
  );
}

export default Home;

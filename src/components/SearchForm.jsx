import React, { useEffect, useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [searchString, setSearchString] = useState('');
  const [searchOptions, setSearchOptions] = useState('shows');

  console.log(searchString);
  // console.log('@23: ', searchOptions);
  //AS the state change component is rerendered
  console.log('searchOptions changes!!');

  useEffect(() => {
    console.log('current effect is running on: ', searchOptions);

    return () => {
      console.log(
        'In ',
        searchOptions,
        ' right before you went to the next option ',

        ' :)'
      );
    };
  }, [searchOptions]);

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

  const formSubmit = e => {
    e.preventDefault();

    //this object is to be destructured in the home~
    const options = {
      query: searchString,
      searchOptions,
    };

    onSearch(options); //simply calling the function that's passed as a prop!
  };

  return (
    <form action="" onSubmit={formSubmit}>
      <input type="text" value={searchString} onChange={onSearchInputChange} />

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
  );
}

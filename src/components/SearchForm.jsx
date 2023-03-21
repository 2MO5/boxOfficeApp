import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchString } from '../lib/useSearchString';
import CustomRadio from './CustomRadio';

export default function SearchForm({ onSearch }) {
  const [searchString, setSearchString] = useSearchString();
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
      <SearchInput
        type="text"
        placeholder="Lemme know what you want!"
        value={searchString}
        onChange={onSearchInputChange}
      />

      <RadiosWrapper>
        <CustomRadio
          label={'Shows'}
          name="search-option"
          checked={searchOptions === 'shows'}
          value="shows"
          onChange={onRadioChange}
        />

        <CustomRadio
          label={'Actors'}
          name="search-option"
          checked={searchOptions === 'actors'}
          value="actors"
          onChange={onRadioChange}
        />
      </RadiosWrapper>

      <SearchButtonWrapper>
        <button type="submit">Search</button>
      </SearchButtonWrapper>
    </form>
  );
}

const SearchInput = styled.input`
  display: block;
  font-family: 'Roboto', sans-serif;
  width: 200px;
  margin: auto;
  outline: none;
  padding: 13px 15px;
  border: 1px solid #dbdbdb;
  box-shadow: 0px 0px 10px 0px rgba(219, 219, 219, 0.5);
  font-size: 14px;
  border-radius: 12px;
  color: #8d8d8d;
  &::placeholder {
    font-weight: 300;
    color: #8d8d8d;
  }
`;

export const RadiosWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
  label {
    margin: 0 15px;
  }
`;

const SearchButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 35px;
  button {
    color: #fff;
    background-color: ${({ theme }) => theme.mainColors.blue};
    margin: auto;
    padding: 10px 50px;
    font-size: 15px;
    border: none;
    outline: none;
    border-radius: 12px;
    &:hover {
      cursor: pointer;
    }
  }
`;

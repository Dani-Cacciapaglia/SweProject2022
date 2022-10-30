import React, { useState, useContext } from 'react';
import axios from 'axios';

import * as style from './Search.module.css';

import { SearchContext } from '../../hooks/SearchContext';

const baseUrl = 'http://localhost:8000/api/search/';

const Search = ({ placeholderText = 'Search' }) => {
  const [userInput, setUserInput] = useState('');
  const { setResult } = useContext(SearchContext);

  const handleChange = async (e) => {
    e.preventDefault();
    setUserInput(e.target.value);

    const res = await axios.get(baseUrl, {
      params: {
        query: userInput,
      },
    });

    setResult(res);
  };

  return (
    <div className={style.container}>
      <input
        className={style.searchField}
        placeholder={placeholderText}
        type="text"
        onChange={handleChange}
        value={userInput}
      />
    </div>
  );
};

export default Search;

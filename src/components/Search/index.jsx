import React, { useState } from 'react';

import * as style from './Search.module.css';

const Search = ({
  placeholderText = 'Search',
  submitText = 'Search',
  searchHandler,
}) => {
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
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
      <button onClick={(e) => searchHandler(e, userInput)}>{submitText}</button>
    </div>
  );
};

export default Search;

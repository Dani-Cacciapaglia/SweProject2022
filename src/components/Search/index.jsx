import React, { useState } from 'react';

import * as style from './Search.module.css';

import { Sliders } from 'react-feather';

const Search = ({
  placeholderText = 'Search',
  submitText = 'Search',
  searchHandler,
}) => {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxResults, setMaxResults] = useState(10);

  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.target.value);
  };

  return (
    <>
      <div className={style.container}>
        <input
          className={style.searchField}
          placeholder={placeholderText}
          type="text"
          onChange={handleChange}
          value={userInput}
        />
        <button
          className={style.submitButton}
          onClick={(e) => {
            searchHandler(e, userInput, startTime, endTime, maxResults);
          }}
        >
          {submitText}
        </button>
        <button className={style.settings}>
          <Sliders />
        </button>
      </div>
      <div className={style.options}>
        <input
          type="datetime-local"
          max={today.toISOString().slice(0, -8)}
          min={lastWeek.toISOString().slice(0, -8)}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="datetime-local"
          max={today.toISOString().slice(0, -8)}
          min={lastWeek.toISOString().slice(0, -8)}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;

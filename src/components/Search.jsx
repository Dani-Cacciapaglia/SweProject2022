import React, { useState } from 'react';

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
      <div className="flex flex-row max-w-prose mx-auto">
        <input
          className="text-lg grow border border-r-0 rounded-l-full pl-4 py-2"
          placeholder={placeholderText}
          type="text"
          onChange={handleChange}
          value={userInput}
        />
        <button
          className="rounded-r-full px-4 bg-sky-300 hover:bg-sky-400"
          onClick={(e) => {
            searchHandler(e, userInput, startTime, endTime, maxResults);
          }}
        >
          {submitText}
        </button>
        <button className="rounded-full bg-neutral-200 hover:bg-neutral-300 aspect-square ml-2 p-2 self-center">
          <Sliders />
        </button>
      </div>
      <div>
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
        <input
          type="number"
          max="100"
          min="10"
          onChange={(e) => setMaxResults(e.target.value)}
        />
      </div>
    </>
  );
};

export default Search;

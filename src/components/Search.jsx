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
  const [maxResults, setMaxResults] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

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
        <form
          className="flex flex-row grow"
          onSubmit={(e) => {
            searchHandler(e, userInput, startTime, endTime, maxResults);
          }}
        >
          <input
            className="text-lg grow border border-r-0 rounded-l-full pl-4 py-2"
            placeholder={placeholderText}
            type="text"
            onChange={handleChange}
            value={userInput}
            required
          />
          <input
            type="submit"
            className="rounded-r-full px-4 bg-sky-300 hover:bg-sky-400"
            value={submitText}
          />
        </form>
        <button
          className="rounded-full bg-neutral-200 hover:bg-neutral-300 aspect-square ml-2 p-2 self-center"
          onClick={(e) => setShowSettings(!showSettings)}
        >
          <Sliders />
        </button>
      </div>
      {showSettings && (
        <div className="flex flex-row max-w-prose mx-auto gap-2 my-2">
          <div>
            <label htmlFor="startTime">Data di inizio:</label>
            <input
              id="startTime"
              className="rounded-full"
              type="datetime-local"
              max={today.toISOString().slice(0, -8)}
              min={lastWeek.toISOString().slice(0, -8)}
              defaultValue={lastWeek.toISOString().slice(0, -8)}
              onChange={(e) => setStartTime(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="endTime">Data di fine:</label>
            <input
              id="endTime"
              className="rounded-full"
              type="datetime-local"
              max={today.toISOString().slice(0, -8)}
              min={lastWeek.toISOString().slice(0, -8)}
              defaultValue={today.toISOString().slice(0, -8)}
              onChange={(e) => setEndTime(new Date(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="maxResults">Numero di risultati:</label>
            <input
              id="maxResults"
              className="rounded-full"
              type="number"
              max="100"
              min="10"
              defaultValue="10"
              onChange={(e) => setMaxResults(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;

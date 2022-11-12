import React, { useState } from 'react';
import axios from 'axios';

import Header from './components/Header';
import Search from './components/Search';
import TweetFeed from './components/TweetFeed';
import { SearchContext } from './hooks/SearchContext';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
const baseUrl = 'http://localhost:8000/api/search';

const App = () => {
  const [result, setResult] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [maxResults, setMaxResults] = useState(0);
  const [lastSearch, setLastSearch] = useState('');
  const [lastSearchParams, setLastSearchParams] = useState({});

  const searchHandler = async (e) => {
    e.preventDefault();

    const params = {
      start_time: startTime || undefined,
      end_time: endTime || undefined,
      max_results: maxResults || undefined,
    };
    setLastSearch(userInput);
    setLastSearchParams(params);

    const res = await axios.get(`${baseUrl}/${encodeURIComponent(userInput)}`, {
      params,
    });

    setResult(res.data);
  };

  const loadMore = async (e, next_token) => {
    e.preventDefault();
    const params = { ...lastSearchParams, next_token: next_token };

    const res = await axios.get(
      `${baseUrl}/${encodeURIComponent(lastSearch)}`,
      {
        params,
      }
    );

    setResult(result.concat(res.data));
  };

  return (
    <main className="flex flex-col gap-2 items-center max-w-screen-md mx-auto m-4">
      <Header />
      <SearchContext.Provider
        value={{
          result,
          setResult,
          setUserInput,
          setStartTime,
          setEndTime,
          setMaxResults,
        }}
      >
        <Search
          placeholderText="Cerca tweet..."
          submitText="Cerca"
          setUserInput
          setStartTime
          setEndTime
          setMaxResults
          searchHandler={searchHandler}
        />
        <TweetFeed loadMore={loadMore} />
      </SearchContext.Provider>
    </main>
  );
};

export default App;

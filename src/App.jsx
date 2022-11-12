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

  const searchHandler = async (
    e,
    userInput,
    startTime,
    endTime,
    maxResults
  ) => {
    e.preventDefault();
    console.log(startTime, endTime, maxResults);

    const params = {
      start_time: startTime || undefined,
      end_time: endTime || undefined,
      max_results: maxResults || undefined,
    };

    const res = await axios.get(`${baseUrl}/${encodeURIComponent(userInput)}`, {
      params,
    });

    setResult(res.data);

    console.log(res);
  };

  return (
    <main className="max-w-screen-md mx-auto">
      <Header />
      <Search
        placeholderText="Cerca tweet..."
        submitText="Cerca"
        searchHandler={searchHandler}
      />
      <SearchContext.Provider value={{ result, setResult }}>
        <TweetFeed />
      </SearchContext.Provider>
    </main>
  );
};

export default App;

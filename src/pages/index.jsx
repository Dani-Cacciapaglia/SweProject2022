import React, { useState } from 'react';
import axios from 'axios';

import * as style from './index.module.css';

import Header from '../components/Header';
import Search from '../components/Search';
import TweetFeed from '../components/TweetFeed';
import { SearchContext } from '../hooks/SearchContext';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
const baseUrl = 'http://localhost:8000/api/search';

const IndexPage = () => {
  const [result, setResult] = useState([]);

  const searchHandler = async (e, userInput) => {
    e.preventDefault();

    const res = await axios.get(`${baseUrl}/${encodeURIComponent(userInput)}`);

    setResult(res.data);

    console.log(res);
  };

  return (
    <main className={style.main}>
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

export default IndexPage;

export const Head = () => <title>Tweets and sweets</title>;

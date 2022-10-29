import * as React from 'react';

import * as style from './index.module.css';

import Header from '../components/Header';
import Search from '../components/Search';
import TweetFeed from '../components/TweetFeed';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent

const IndexPage = () => {
  return (
    <main className={style.main}>
      <Header />
      <Search placeholderText="Cerca tweet..." />
      <TweetFeed />
    </main>
  );
};

export default IndexPage;

export const Head = () => <title>Tweets and sweets</title>;

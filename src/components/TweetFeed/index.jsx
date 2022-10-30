import React, { useState } from 'react';

import * as style from './TweetFeed.module.css';

import TweetCard from '../TweetCard';

import { SearchContext } from '../../hooks/SearchContext';

const TweetFeed = () => {
  const [result, setResult] = useState(null);

  return (
    <section className={style.feed}>
      <SearchContext.Provider value={{ result, setResult }}>
        {result && result.map((item) => <TweetCard tweetData={item} />)}
      </SearchContext.Provider>
    </section>
  );
};

export default TweetFeed;

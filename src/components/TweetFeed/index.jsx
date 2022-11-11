import React, { useContext } from 'react';

import style from './TweetFeed.module.css';

import TweetCard from '../TweetCard';
import { SearchContext } from '../../hooks/SearchContext';

const TweetFeed = () => {
  const { result } = useContext(SearchContext);

  return (
    <section className={style.feed}>
      {result &&
        result.length > 0 &&
        result.map((item) => <TweetCard tweetData={item} />)}
    </section>
  );
};

export default TweetFeed;

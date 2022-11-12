import React, { useContext } from 'react';

import TweetCard from './TweetCard';
import { SearchContext } from '../hooks/SearchContext';

const TweetFeed = () => {
  const { result } = useContext(SearchContext);

  return (
    <section className="flex flex-col max-w-prose gap-4 p-4 mx-auto">
      {result &&
        result.length > 0 &&
        result.map((item, index) => <TweetCard key={index} tweetData={item} />)}
    </section>
  );
};

export default TweetFeed;

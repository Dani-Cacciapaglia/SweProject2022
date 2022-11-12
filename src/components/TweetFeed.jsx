import React, { useContext } from 'react';

import TweetCard from './TweetCard';
import { SearchContext } from '../hooks/SearchContext';

const TweetFeed = ({ loadMore }) => {
  const { result } = useContext(SearchContext);

  return (
    <>
      <section className="flex flex-col max-w-prose gap-4 p-4 mx-auto">
        {result &&
          result.length > 0 &&
          result.map((item, index) => (
            <TweetCard key={index} tweetData={item} />
          ))}
      </section>
      {result && result.length > 0 && result[result.length - 1].next_token && (
        <button
          className="bg-sky-300 hover:bg-sky-400 rounded p-2"
          onClick={(e) => {
            loadMore(e, result[result.length - 1].next_token);
          }}
        >
          Carica altro
        </button>
      )}
    </>
  );
};

export default TweetFeed;
